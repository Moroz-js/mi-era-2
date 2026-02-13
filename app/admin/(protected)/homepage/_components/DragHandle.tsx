interface DragHandleProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export function DragHandle({ onMoveUp, onMoveDown, canMoveUp, canMoveDown }: DragHandleProps) {
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={onMoveUp}
        disabled={!canMoveUp}
        className={`p-1 rounded hover:bg-gray-200 transition-colors ${
          !canMoveUp ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
        }`}
        type="button"
        title="Move up"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 14l5-5 5 5z" />
        </svg>
      </button>
      <button
        onClick={onMoveDown}
        disabled={!canMoveDown}
        className={`p-1 rounded hover:bg-gray-200 transition-colors ${
          !canMoveDown ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
        }`}
        type="button"
        title="Move down"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
    </div>
  );
}
