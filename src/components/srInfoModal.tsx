import React from 'react';
import { Types } from '@ohif/core';

function SRDisplaySetInfo({ srDisplaySets }: { srDisplaySets: Types.DisplaySet[] }) {
  return (
    <>
      {srDisplaySets.map((displaySet, index) => {
        return (
          <div key={index} className="text-blue-300">
            <p>{displaySet.label}</p>
            {displaySet.measurements.map((measurement, idx) => (
              <div key={idx} className="ml-4">
                {measurement.labels.map(({ label, value }, labelIdx) => (
                  <div key={labelIdx} className="text-blue-200">
                    <span className="font-bold">{label}:</span> {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

function getDisplaySetsInActiveViewport({
  viewportGridService,
  displaySetService,
}: {
  viewportGridService: AppTypes.ViewportGridService;
  displaySetService: AppTypes.DisplaySetService;
}) {
  const dsUids = viewportGridService.getDisplaySetsUIDsForViewport(
    viewportGridService.getActiveViewportId()
  );
  return displaySetService.getDisplaySetsBy(displaySet =>
    dsUids.includes(displaySet.displaySetInstanceUID)
  );
}

export default function getSrInfoModal({
  viewportGridService,
  displaySetService,
}: {
  viewportGridService: AppTypes.ViewportGridService;
  displaySetService: AppTypes.DisplaySetService;
}) {
  const activeDisplaySets = getDisplaySetsInActiveViewport({
    viewportGridService,
    displaySetService,
  });

  const srDisplaySets = activeDisplaySets.filter(displaySet => displaySet.Modality === 'SR');

  return <SRDisplaySetInfo srDisplaySets={srDisplaySets} />;
}
