import { CheckIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import React from "react";

const netflixPlansArray = [
  {
    type: "Basic",
    videoQuality: "Good",
    resolution: "480p",
    price: "429 ARS",
    portability: true,
  },
  {
    type: "Standard",
    videoQuality: "Better",
    resolution: "1080p",
    price: "799 ARS",
    portability: true,
  },
  {
    type: "Premium",
    videoQuality: "Best",
    resolution: "4K+HDR",
    price: "1199 ARS",
    portability: true,
  },
];

interface TableProps {
  selectedPlan: string;
}

const Table = ({ selectedPlan }: TableProps) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        {/*The data can be mapped from a db so the prices become dynamic and not hardcoded*/}
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {netflixPlansArray.map((plan) => (
            <td
              className={classNames("tableDataFeature", {
                "text-[#e50914]": selectedPlan === plan.type,
                "text-[gray]": selectedPlan != plan.type,
              })}
            >
              {plan.price}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {netflixPlansArray.map((plan) => (
            <td
              className={classNames("tableDataFeature", {
                "text-[#e50914]": selectedPlan === plan.type,
                "text-[gray]": selectedPlan != plan.type,
              })}
            >
              {plan.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {netflixPlansArray.map((plan) => (
            <td
              className={classNames("tableDataFeature", {
                "text-[#e50914]": selectedPlan === plan.type,
                "text-[gray]": selectedPlan != plan.type,
              })}
            >
              {plan.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {netflixPlansArray.map((plan) => (
            <td
              className={classNames("tableDataFeature", {
                "text-[#e50914]": selectedPlan === plan.type,
                "text-[gray]": selectedPlan != plan.type,
              })}
            >
              {plan.portability && (
                <CheckIcon className="inline-block w-8 h-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export { Table };
