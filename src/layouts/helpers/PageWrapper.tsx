import PricingCard from "@/helpers/PricingCard";
import { markdownify } from "@/lib/utils/textConverter";
import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";

type Data = CollectionEntry<"pricing">["data"];
type Props = Data & {
  layout?: "Pricing" | "Pricing-2";
};

const PricingWrapper = (props: Props) => {
  const { pricing_cards, offer, layout } = props || {};
  const [checkd, setCheck] = useState(false);
  const type = checkd ? "yearly" : "monthly";

  return (
    <>
      <div className="row">
        <div className="col-12 text-center mb-10">
          <div className="pricing-switch flex items-center justify-center mt-12">
            <label className="h5" id="monthly">
              Billed Monthly
            </label>

            <label className="relative inline-flex items-center cursor-pointer mx-2">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-14 h-8 border-dark border rounded-full peer peer-checked:after:left-full peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 after:bg-primary after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>

            <label className="h5 m-0" id="annually">
              Billed Annually
            </label>
          </div>
          <p
            className="text-primary mt-3"
            dangerouslySetInnerHTML={{ __html: markdownify(offer!) }}
          />
        </div>
      </div>

      {layout !== "Pricing-2" ? (
        <div className="row">
          {pricing_cards.map((card, i) => {
            return (
              <div key={i} className="lg:col-4 md:col-6">
                <PricingCard type={type} layout={layout} {...card} />
              </div>
            );
          })}
        </div>
      ) : (
        <PricingTable {...props} />
      )}
    </>
  );
};

export default PricingWrapper;

function PricingTable({ pricing_cards, pricing_table_data }: Data) {
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="pricing-table shadow">
          <thead>
            <tr>
              {pricing_cards.map((item, i) => (
                <th key={i}>
                  {item.name && (
                    <h3
                      className="font-weight-bold text-white"
                      dangerouslySetInnerHTML={{
                        __html: markdownify(item.name),
                      }}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pricing_table_data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.table_row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell.name}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
