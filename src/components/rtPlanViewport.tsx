import React from 'react';

function RTPlanViewport({ displaySets }: { displaySets: AppTypes.DisplaySet[] }) {
  return (
    <div className="rt-plan-viewport relative flex h-full w-full flex-col overflow-auto p-4 text-white">
      <h1 className="mb-4 text-2xl font-bold">RT Plan Viewport</h1>
      <ul>
        {displaySets.map((ds, index) => (
          <li key={index} className="mb-1">
            <ul className="p-3">
              <li>
                Series Description: <b>{ds.SeriesDescription}</b>
              </li>
              <li>
                Series Instance UID: <b>{ds.SeriesInstanceUID}</b>
              </li>
              <li>
                Series Number: <b>{ds.SeriesNumber}</b>
              </li>
              <li>
                <ul className="p-3">
                  <li>
                    SOP Instance UID: <b>{ds.instance.SOPInstanceUID}</b>
                  </li>
                  <li>
                    Patient ID: <b>{ds.instance.PatientID}</b>
                  </li>
                  <li>
                    Patient name: <b>{ds.instance.PatientName.toString()}</b>
                  </li>
                  <li>
                    <ul className="p-2 text-sm">
                      {ds.instance.BeamSequence.map((beam, beamIndex) => (
                        <li key={beamIndex}>
                          <b>Beam {beamIndex + 1}:</b>
                          <ul>
                            <li>
                              Beam Description: <b>{beam.BeamDescription}</b>
                            </li>
                            <li>
                              Beam Name: <b>{beam.BeamName}</b>
                            </li>
                            <li>
                              Beam Number: <b>{beam.BeamNumber}</b>
                            </li>
                            <li>
                              Beam Type: <b>{beam.BeamType}</b>
                            </li>
                            <li>
                              Final Cumulative Meterset Weight:{' '}
                              <b>{beam.FinalCumulativeMetersetWeight}</b>
                            </li>
                            <li>
                              Manufacturer: <b>{beam.Manufacturer}</b>
                            </li>
                            <li>
                              Number Of Blocks: <b>{beam.NumberOfBlocks}</b>
                            </li>
                            <li>
                              Number Of Boli: <b>{beam.NumberOfBoli}</b>
                            </li>
                            <li>
                              Number Of Compensators: <b>{beam.NumberOfCompensators}</b>
                            </li>
                            <li>
                              Number Of ControlPoints: <b>{beam.NumberOfControlPoints}</b>
                            </li>
                            <li>
                              Number Of Wedges: <b>{beam.NumberOfWedges}</b>
                            </li>
                            <li>
                              Radiation Type: <b>{beam.RadiationType}</b>
                            </li>
                            <li>
                              Source Axis Distance: <b>{beam.SourceAxisDistance}</b>
                            </li>
                            <li>
                              Treatment Delivery Type: <b>{beam.TreatmentDeliveryType}</b>
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function getRtPlanViewport({ displaySets }: { displaySets: AppTypes.DisplaySet[] }) {
  return (
    <React.Suspense fallback={<div>Loading RT Plan Viewport...</div>}>
      <RTPlanViewport displaySets={displaySets} />
    </React.Suspense>
  );
}
