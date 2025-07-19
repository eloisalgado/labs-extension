import React from 'react';
import classNames from 'classnames';
import { Types } from '@ohif/core';

function DisplaySetInfo({
  displaySetService,
  displaySetInstanceUIDs,
}: {
  displaySetService: AppTypes.DisplaySetService;
  displaySetInstanceUIDs: string[];
}) {
  return (
    <>
      {displaySetInstanceUIDs.map((uid, index) => {
        const displaySet = displaySetService.getDisplaySetByUID(uid);
        if (!displaySet) {
          return (
            <span key={index} className="text-red-500">
              Unknown Display Set UID: {uid}
            </span>
          );
        }
        return (
          <span key={index} className="text-blue-300">
            {displaySet.label} ({displaySet.images?.length || 0} images)
          </span>
        );
      })}
    </>
  );
}

export default function getLabsInfoModal({
  viewportsState,
  displaySetService,
}: {
  viewportsState: AppTypes.ViewportGrid.State;
  displaySetService: AppTypes.DisplaySetService;
}) {
  const { activeViewportId, layout, viewports, isHangingProtocolLayout } = viewportsState;

  return (
    <div className="text-blue-500">
      <div>
        <p>
          Viewport Layout: {layout.layoutType}:{' '}
          <b>
            {layout.numCols}x{layout.numRows}
          </b>
        </p>
        <p>
          Hanging protocol layout: <b>{isHangingProtocolLayout ? 'Yes' : 'No'}</b>
        </p>
        <p>
          Active Viewport ID: <b>{activeViewportId}</b>
        </p>
      </div>
      <div className="p-2">
        <div className="flex items-center">
          <div className="w-1/3">Viewport Index</div>
          <div className="w-2/3">Display Set</div>
        </div>
        {Array.from(viewports.values()).map((viewport, index) => (
          <div
            key={viewport.viewportId}
            className={classNames('mb-2 flex items-center text-blue-400', {
              'border-highlight border-2': viewport.viewportId === activeViewportId,
            })}
          >
            <div className="w-1/3">
              {index + 1} ({viewport.viewportOptions.viewportType})
            </div>
            <div className="w-2/3">
              <DisplaySetInfo
                displaySetService={displaySetService}
                displaySetInstanceUIDs={viewport.displaySetInstanceUIDs}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
