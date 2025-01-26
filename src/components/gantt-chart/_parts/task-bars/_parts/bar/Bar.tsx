import { useState, useEffect } from "react";

import { BarDateHandle } from "../bar-date-handle/BarDateHandle";
import { BarProgressHandle } from "../bar-progress-handle/BarProgressHandle";

import type { BarProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../../../../constants";

import styles from "./Bar.module.css";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const Bar: React.FC<BarProps> = ({
  task,
  index,
  dateToX,
  xToDate,
  onDateChange,
}) => {
  const [localStartDate, setLocalStartDate] = useState(task.startDate);
  const [localEndDate, setLocalEndDate] = useState(task.endDate);

  const [localProgress, setLocalProgress] = useState(task.progress);

  const [isHovered, setIsHovered] = useState(false);

  const [draggingStart, setDraggingStart] = useState(false);
  const [draggingEnd, setDraggingEnd] = useState(false);
  const [draggingProgress, setDraggingProgress] = useState(false);

  const [initialMouseX, setInitialMouseX] = useState(0);

  const [initialStartX, setInitialStartX] = useState(0);
  const [initialEndX, setInitialEndX] = useState(0);
  const [initialProgress, setInitialProgress] = useState(task.progress);

  const startX = dateToX(localStartDate);
  const endX = dateToX(localEndDate);
  const width = endX - startX;
  const y = index * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;

  const progressWidth = (width * localProgress) / 100;

  /**
   * drag date handle
   * @param type
   * @param event
   */
  const onMouseDownDateHandle = (
    type: "start" | "end",
    event: React.MouseEvent<SVGRectElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    setInitialMouseX(event.clientX);

    if (type === "start") {
      setDraggingStart(true);
      setInitialStartX(startX);
    } else {
      setDraggingEnd(true);
      setInitialEndX(endX);
    }
  };

  /**
   * drag progress handle
   * @param event
   */
  const onMouseDownProgressHandle = (
    event: React.MouseEvent<SVGPolygonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setDraggingProgress(true);
    setInitialMouseX(event.clientX);
    setInitialProgress(localProgress);
  };

  useEffect(() => {
    /**
     * mouse move handler called during a drag
     * @param event
     */
    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - initialMouseX;

      // (1) start date handle is dragging
      if (draggingStart) {
        const newStartX = initialStartX + deltaX;
        let newStartDate = xToDate(newStartX);

        // ensure minimum 1 day between start date and end date
        // first, calculate "end date - 1 day"
        const minStartMs = localEndDate.getTime() - ONE_DAY_MS;
        // if new start date is in the future, set it to minStartMs
        if (newStartDate.getTime() > minStartMs) {
          newStartDate = new Date(minStartMs);
        }

        setLocalStartDate(newStartDate);
        onDateChange?.(task.id, newStartDate, localEndDate);
      }
      // (2) end date handle is dragging
      else if (draggingEnd) {
        const newEndX = initialEndX + deltaX;
        let newEndDate = xToDate(newEndX);

        // start date + 1 day
        const minEndMs = localStartDate.getTime() + ONE_DAY_MS;
        // if new end date is in the past, set it to minEndMs
        if (newEndDate.getTime() < minEndMs) {
          newEndDate = new Date(minEndMs);
        }

        setLocalEndDate(newEndDate);
        onDateChange?.(task.id, localStartDate, newEndDate);
      }
      // (3) progress handle is dragging
      else if (draggingProgress) {
        const deltaProgress = (deltaX / width) * 100;
        let newProgress = initialProgress + deltaProgress;
        newProgress = Math.max(0, Math.min(100, newProgress));
        setLocalProgress(newProgress);
      }
    };

    /**
     * mouse up handler called when dragging ends
     */
    const handleMouseUp = () => {
      setDraggingStart(false);
      setDraggingEnd(false);
      setDraggingProgress(false);
    };

    if (draggingStart || draggingEnd || draggingProgress) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    // cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    task.id,
    draggingStart,
    draggingEnd,
    draggingProgress,
    initialMouseX,
    initialStartX,
    initialEndX,
    initialProgress,
    localEndDate,
    localStartDate,
    width,
    xToDate,
    onDateChange,
  ]);

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* bar background */}
      <rect
        className={styles["default-bar"]}
        x={startX}
        y={y + GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN}
        rx="5"
        ry="5"
        width={width}
        height={
          GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT -
          GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN * 2
        }
      />

      {/* progress bar */}
      {localProgress > 0 && (
        <rect
          className={styles["progress-bar"]}
          x={startX}
          y={y + GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN}
          rx="5"
          ry="5"
          width={progressWidth}
          height={
            GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT -
            GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN * 2
          }
        />
      )}

      {/* task name */}
      <text
        className={styles["task-name"]}
        x={startX + width / 2}
        y={y + GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT / 1.95}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {task.name}
      </text>

      {/* handles shown when hovered */}
      {isHovered && (
        <>
          {/* start date handle */}
          <BarDateHandle
            type="start"
            x={startX + 2}
            y={y + 15}
            width={width}
            onMouseDownDateHandle={onMouseDownDateHandle}
          />

          {/* progress handle */}
          <BarProgressHandle
            progressPoint={`
              ${startX + progressWidth}, ${y + 35}
              ${startX + progressWidth - 5}, ${y + 40}
              ${startX + progressWidth + 5}, ${y + 40}
            `}
            onMouseDownProgressHandle={onMouseDownProgressHandle}
          />

          {/* end date handle */}
          <BarDateHandle
            type="end"
            x={endX - 7}
            y={y + 15}
            width={width}
            onMouseDownDateHandle={onMouseDownDateHandle}
          />
        </>
      )}
    </g>
  );
};

export default Bar;
