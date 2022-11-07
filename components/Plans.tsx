import React, { Dispatch, SetStateAction } from "react";
import MuiModal from "@mui/material/Modal";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { Table } from "./Table";
import { useState } from "react";
import classNames from "classnames";

interface PlansType {
  setShowPlans: Dispatch<SetStateAction<boolean>>;
  showPlans: boolean;
}
const Plans = ({ setShowPlans, showPlans }: PlansType) => {
  const handleClose = () => {
    setShowPlans(false);
  };

  const [selectedPlan, setSelectedPlan] = useState<string>("Premium");

  const router = useRouter();

  /*This is just to show a potential functionality for subscription payment, where the user
    chooses a pack and is redirected to pay. The payment functionality is not implemented in this case;
    the account is still created when the user clicks on "sign up" in the login page.*/

  return (
    <MuiModal
      open={showPlans}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <main className="relative bg-[#141414] rounded-md m-16 pt-28 px-5 pb-12 max-w-5xl transition-all md:px-10">
          <div>
            <h1 className="mb-3 text-3xl font-medium">
              Choose the plan that's right for you
            </h1>
            <ul>
              <li className="flex items-center gap-x-2 text-lg">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you
                want. Ad-free.
              </li>
              <li className="flex items-center gap-x-2 text-lg">
                <CheckIcon className="h-7 w-7 text-[#E50914]" />
                Recommendations just for you.
              </li>
              <li className="flex items-center gap-x-2 text-lg">
                <CheckIcon className="h-7 w-7 text-[#E50914]" />
                Change or cancel your plan anytime.
              </li>
            </ul>
            <div className="mt-4 flex flex-col space-y-4">
              <div className="flex w-full items-center self-end md:w-3/5">
                <div
                  className={classNames("planBox", {
                    "opacity-100": selectedPlan === "Basic",
                    "opacity-60": selectedPlan !== "Basic",
                  })}
                  onClick={() => setSelectedPlan("Basic")}
                >
                  Basic
                </div>
                <div
                  className={classNames("planBox", {
                    "opacity-100": selectedPlan === "Standard",
                    "opacity-60": selectedPlan !== "Standard",
                  })}
                  onClick={() => setSelectedPlan("Standard")}
                >
                  Standard
                </div>
                <div
                  className={classNames("planBox", {
                    "opacity-100": selectedPlan === "Premium",
                    "opacity-60": selectedPlan !== "Premium",
                  })}
                  onClick={() => setSelectedPlan("Premium")}
                >
                  Premium
                </div>
              </div>
              <Table selectedPlan={selectedPlan} />
              <button
                onClick={() => router.push("/")}
                className="mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg[#f6121d] md:w-[420px]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </main>
      </>
    </MuiModal>
  );
};

export { Plans };
