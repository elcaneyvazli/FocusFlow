import React, { memo } from "react";
import { ArrowUp } from "lucide-react";
import ErrorGraph from "../Graphs/ErrorGraph";
import SuccessGraph from "../Graphs/SuccessGraph";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import NumberFlow from "@number-flow/react";

const StatsCard = memo(
  ({ title, value, percentage, type, icon, isLoading }) => {
    const graphComponent =
      type === "success" ? <SuccessGraph /> : <ErrorGraph />;
    const colorClasses =
      type === "success"
        ? "bg-success-100 border-success-600 text-success-600"
        : "bg-error-100 border-error-600 text-error-600";

    const textClasses =
      type === "success" ? "text-success-600" : "text-error-600";

    return (
      <div className="border-b md:border-l md:border-b xl:border-l border-border p-12 flex flex-col gap-16 w-full col-span-12 md:col-span-6 xl:col-span-4">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-text text-lg">{title}</p>
          <div className="px-8 py-8 bg-background border border-border text-text rounded-md">
            {icon}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-8">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <p className="text-text text-4xl font-medium leading-none">
                    <NumberFlow value={value} />
                  </p>
                  <div className="flex flex-row items-center gap-4">
                    <div
                      className={`${colorClasses} border flex items-center justify-center rounded-full p-2`}
                    >
                      <ArrowUp className={colorClasses} size={12} />
                    </div>
                    <p
                      className={
                        textClasses + " text-sm font-semibold leading-none"
                      }
                    >
                      <NumberFlow value={percentage} />%
                    </p>
                  </div>
                </>
              )}
            </div>
            <h1 className="text-light text-sm leading-none">
              From the last week
            </h1>
          </div>
          {!isLoading && graphComponent}
        </div>
      </div>
    );
  }
);

export default StatsCard;
