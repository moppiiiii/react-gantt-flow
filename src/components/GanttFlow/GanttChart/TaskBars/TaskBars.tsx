import { memo, useCallback, useMemo, useRef, useState } from "react";
import Bar from "../Bar";
import DependenciesArrow from "../DependenciesArrow";

import type { TaskBarsPosition, TaskBarsProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

const TaskBars: React.FC<TaskBarsProps> = memo(
  ({ tasks, chartMinDate, chartMaxDate, dateToX, xToDate, onTaskUpdate }) => {
    const { BAR_AREA_HEIGHT, AXIS_HEIGHT } = GANTT_CHART_DEFAULT_VALUE;

    // Transient draft overrides during drag; keeps arrows and bar positions in sync without touching parent state
    const [draftMap, setDraftMap] = useState<
      Record<string, { startDate: Date; endDate: Date; progress?: number }>
    >({});
    const rafRef = useRef<number | null>(null);

    const scheduleDraftUpdate = useCallback(
      (
        taskId: string,
        override: { startDate: Date; endDate: Date; progress?: number },
      ) => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
          setDraftMap((prev) => ({ ...prev, [taskId]: override }));
          rafRef.current = null;
        });
      },
      [],
    );

    const clearDraft = useCallback((taskId: string) => {
      setDraftMap((prev) => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });
    }, []);

    const visibleTasks = useMemo(() => {
      return tasks.map((t) => {
        const o = draftMap[t.id];
        if (!o) return t;
        return {
          ...t,
          startDate: o.startDate,
          endDate: o.endDate,
          ...(o.progress !== undefined ? { progress: o.progress } : {}),
        };
      });
    }, [tasks, draftMap]);

    const barPositions: TaskBarsPosition[] = useMemo(() => {
      return visibleTasks.map((task, i) => {
        const x = dateToX(task.startDate);
        const width = dateToX(task.endDate) - dateToX(task.startDate);
        const y = i * BAR_AREA_HEIGHT;
        return { x, y, width };
      });
    }, [visibleTasks, dateToX, BAR_AREA_HEIGHT]);

    const handleUpdateTaskDate = (
      taskId: string,
      newStart: Date,
      newEnd: Date,
      newProgress?: number,
      shouldNotifyExternal = true,
    ) => {
      if (!shouldNotifyExternal) {
        // During drag: update only local draft and keep parent intact
        scheduleDraftUpdate(taskId, {
          startDate: newStart,
          endDate: newEnd,
          progress: newProgress,
        });
      } else {
        // Commit: clear draft and propagate to parent
        clearDraft(taskId);
      }
      onTaskUpdate(taskId, newStart, newEnd, newProgress, shouldNotifyExternal);
    };

    return (
      <g transform={`translate(0, ${AXIS_HEIGHT})`}>
        <DependenciesArrow tasks={visibleTasks} barPositions={barPositions} />

        {visibleTasks.map((task, index) => (
          <Bar
            key={`bar-${task.id}`}
            task={task}
            index={index}
            dateToX={dateToX}
            xToDate={xToDate}
            onDateChange={handleUpdateTaskDate}
            chartMinDate={chartMinDate}
            chartMaxDate={chartMaxDate}
          />
        ))}
      </g>
    );
  },
);

export default memo(TaskBars);
