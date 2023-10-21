import PricingCard from "@/helpers/PricingCard";
import { markdownify } from "@/lib/utils/textConverter";
import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import Counter from "./Couter";
import DynamicIcon from "./DynamicIcon";

type Data = CollectionEntry<"pricing">["data"];
type Props = Data;

const PricingWrapper = (props: Props) => {
  const { pricing_cards, offer, layout } = props || {};
  const [checked, setCheck] = useState(false);
  const type = checked ? "yearly" : "monthly";

  return (
    <>
      <div className="row">
        <div className="col-12 text-center mb-5">
          <div className="pricing-switch flex items-center justify-center mt-14">
            <label className="h5" id="monthly">
              Billed Monthly
            </label>

            <label className="relative inline-flex items-center cursor-pointer mx-3 group">
              <input
                onChange={(e) => setCheck(e.target.checked)}
                type="checkbox"
                className="sr-only peer"
                checked={checked}
              />
              <div className="w-[70px] h-[34px] border-dark border rounded-full peer peer-checked:after:left-[95%] peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 after:bg-primary after:rounded-full after:h-[24px] after:w-[24px] after:transition-all scale-100 peer-checked:active:after:scale-75 peer-active:after:scale-75"></div>
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

      {layout === "Pricing" ? (
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
        <PricingTable type={type} {...props} />
      )}
    </>
  );
};

export default PricingWrapper;

function PricingTable({
  pricing_cards,
  pricing_table_data,
  type,
}: Data & {
  type: string;
}) {
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="pricing-table shadow mx-auto">
          <thead className="pricing-table-head">
            <tr>
              {pricing_cards.map((item, i) => (
                <th key={i}>
                  {item.name && (
                    <h4
                      className="font-medium mx-3 text-white"
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
            <tr>
              {pricing_cards.map((item, i) => {
                const price =
                  type === "yearly" ? item.yearly_price : item.monthly_price;
                return (
                  <td data-label={item.name} key={i}>
                    {price && (
                      <>
                        <span className="h2 inline-flex">
                          <Counter duration={1} count={+price} prefix="$" />
                        </span>
                        <span className="ml-1 inline-block capitalize font-medium">
                          \{type}
                        </span>
                      </>
                    )}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: markdownify(item.monthly_content!),
                      }}
                    />
                  </td>
                );
              })}
            </tr>
            {pricing_table_data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.table_row.map((cell, cellIndex) => {
                  const icon =
                    type === "yearly" ? cell.yearly_icon : cell.monthly_icon;
                  const content =
                    type === "yearly"
                      ? cell.yearly_content
                      : cell.monthly_content;
                  const count =
                    type === "yearly" ? cell.yearly_count : cell.monthly_count;

                  return (
                    <td key={cellIndex} data-label={cell.name}>
                      {icon && (
                        <DynamicIcon
                          className={`inline-block mr-2 
                          ${icon ? "text-primary" : "text-light"}`}
                          icon={icon}
                        />
                      )}
                      <span className="text-light font-medium">
                        {content && content}
                        {count && <Counter duration={1} count={+count} />}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr>
              {pricing_cards.map((item, i) => (
                <td data-label={item.name} key={i}>
                  {item.button_label && (
                    <a
                      href={item.button_link}
                      className={`btn block text-center ${
                        item.recomended ? "btn-primary" : "btn-outline-primary"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: markdownify(item.button_label),
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
