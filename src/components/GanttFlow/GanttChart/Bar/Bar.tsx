import { useState, useEffect, useRef } from "react";

import BarDateHandle from "../BarDateHandle";
import BarProgressHandle from "../BarProgressHandle";

import type { BarProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

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

  // Drag target type (null = not dragging)
  const [dragType, setDragType] = useState<
    "start" | "end" | "progress" | "bar" | null
  >(null);

  // Bar name display position calculation
  const [displayOutside, setDisplayOutside] = useState(false);

  const { BAR_AREA_HEIGHT, GRID_COLUMN_WIDTH, BAR_ALIGN_MARGIN } =
    GANTT_CHART_DEFAULT_VALUE;

  // drag start coordinates / values
  const dragDataRef = useRef({
    initialMouseX: 0,
    initialStartX: 0,
    initialEndX: 0,
    initialProgress: task.progress,
  });

  const textRef = useRef<SVGTextElement>(null);

  const startX = dateToX(localStartDate);
  const endX = dateToX(localEndDate);
  const width = endX - startX;
  const y = index * BAR_AREA_HEIGHT;

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

    dragDataRef.current.initialMouseX = event.clientX;

    if (type === "start") {
      dragDataRef.current.initialStartX = startX;
      setDragType("start");
    } else {
      dragDataRef.current.initialEndX = endX;
      setDragType("end");
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
    dragDataRef.current.initialMouseX = event.clientX;
    dragDataRef.current.initialProgress = localProgress;
    setDragType("progress");
  };

  /**
   * Start dragging the bar body
   */
  const onMouseDownBar = (
    event: React.MouseEvent<SVGRectElement | SVGGElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    dragDataRef.current.initialMouseX = event.clientX;
    dragDataRef.current.initialStartX = startX;
    dragDataRef.current.initialEndX = endX;
    setDragType("bar");
  };

  useEffect(() => {
    /**
     * mouse move handler called during a drag
     * @param event
     */
    const handleMouseMove = (event: MouseEvent) => {
      const { initialMouseX, initialStartX, initialEndX, initialProgress } =
        dragDataRef.current;

      const deltaX = event.clientX - initialMouseX;

      // (1) start date handle is dragging
      if (dragType === "start") {
        const GRID_WIDTH = GRID_COLUMN_WIDTH;
        const daysDelta = Math.round(deltaX / GRID_WIDTH);
        const baseStartDate = xToDate(initialStartX);
        let newStartDate = new Date(
          baseStartDate.getTime() + daysDelta * ONE_DAY_MS,
        );

        // ensure minimum 1 day between start date and end date
        const minStartMs = localEndDate.getTime() - ONE_DAY_MS;
        if (newStartDate.getTime() > minStartMs) {
          newStartDate = new Date(minStartMs);
        }

        setLocalStartDate(newStartDate);

        // internal update during dragging (no external notification)
        onDateChange(task.id, newStartDate, localEndDate, localProgress, false);
      }
      // (2) end date handle is dragging
      else if (dragType === "end") {
        const GRID_WIDTH = GRID_COLUMN_WIDTH;
        const daysDelta = Math.round(deltaX / GRID_WIDTH);
        const baseEndDate = xToDate(initialEndX);
        let newEndDate = new Date(
          baseEndDate.getTime() + daysDelta * ONE_DAY_MS,
        );

        // start date + 1 day
        const minEndMs = localStartDate.getTime() + ONE_DAY_MS;
        if (newEndDate.getTime() < minEndMs) {
          newEndDate = new Date(minEndMs);
        }

        setLocalEndDate(newEndDate);

        // Internal update during dragging (no external notification)
        onDateChange(task.id, localStartDate, newEndDate, localProgress, false);
      }
      // (3) dragging the bar body
      else if (dragType === "bar") {
        const GRID_WIDTH = GRID_COLUMN_WIDTH;
        const daysDelta = Math.round(deltaX / GRID_WIDTH);

        const baseStartDate = xToDate(initialStartX);
        const baseEndDate = xToDate(initialEndX);

        const newStartDate = new Date(
          baseStartDate.getTime() + daysDelta * ONE_DAY_MS,
        );
        const newEndDate = new Date(
          baseEndDate.getTime() + daysDelta * ONE_DAY_MS,
        );

        setLocalStartDate(newStartDate);
        setLocalEndDate(newEndDate);

        // Internal update during dragging (no external notification)
        onDateChange(task.id, newStartDate, newEndDate, localProgress, false);
      }
      // (4) progress handle is dragging
      else if (dragType === "progress") {
        const deltaProgress = (deltaX / width) * 100;
        let newProgress = initialProgress + deltaProgress;
        newProgress = Math.max(0, Math.min(100, newProgress));
        setLocalProgress(newProgress);

        // Internal update during dragging (no external notification)
        onDateChange(task.id, localStartDate, localEndDate, newProgress, false);
      }
    };

    /**
     * mouse up handler called when dragging ends
     */
    const handleMouseUp = () => {
      const wasDragging = dragType !== null;

      // drag end
      setDragType(null);

      if (wasDragging) {
        // notify external when drag ends
        onDateChange(
          task.id,
          localStartDate,
          localEndDate,
          localProgress,
          true,
        );
      }
    };

    if (dragType !== null) {
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
    dragType,
    localEndDate,
    localStartDate,
    localProgress,
    width,
    GRID_COLUMN_WIDTH,
    xToDate,
    onDateChange,
  ]);

  /**
   * When the task property passed from the parent component is updated
   * (= changed by auto-layout of dependent tasks, etc.),
   * synchronize the local state if not dragging.
   */
  useEffect(() => {
    if (dragType === null) {
      setLocalStartDate(task.startDate);
      setLocalEndDate(task.endDate);
      setLocalProgress(task.progress);
    }
    // By including dragType in the dependency array, synchronize only once after drag ends
  }, [task.startDate, task.endDate, task.progress, dragType]);

  useEffect(() => {
    if (textRef.current) {
      const textBBox = textRef.current.getBBox();
      setDisplayOutside(textBBox.width + 10 > width);
    }
  }, [width]);

  return (
    <g>
      {/* bar background */}
      <rect
        className={styles["default-bar"]}
        x={startX}
        y={y + BAR_ALIGN_MARGIN}
        rx="5"
        ry="5"
        width={width}
        height={BAR_AREA_HEIGHT - BAR_ALIGN_MARGIN * 2}
        role="button"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
          }
        }}
        onMouseDown={onMouseDownBar}
      />

      {/* progress bar */}
      {localProgress > 0 && (
        <rect
          className={styles["progress-bar"]}
          x={startX}
          y={y + BAR_ALIGN_MARGIN}
          rx="5"
          ry="5"
          width={progressWidth}
          height={BAR_AREA_HEIGHT - BAR_ALIGN_MARGIN * 2}
          role="button"
          tabIndex={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
            }
          }}
          onMouseDown={onMouseDownBar}
        />
      )}

      {/* task name */}
      <text
        ref={textRef}
        className={styles["task-name"]}
        x={displayOutside ? endX + 5 : startX + width / 2}
        y={y + BAR_AREA_HEIGHT / 1.95}
        dominantBaseline="middle"
        textAnchor={displayOutside ? "start" : "middle"}
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
            onMouseDownDateHandle={onMouseDownDateHandle}
          />
        </>
      )}
    </g>
  );
};

export default Bar;
