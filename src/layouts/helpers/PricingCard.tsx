import { markdownify, plainify } from "@/lib/utils/textConverter";
import type { CollectionEntry } from "astro:content";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type Props = CollectionEntry<"pricing">["data"]["pricing_cards"][0] & {
  type: string;
  layout?: "Pricing" | "Pricing-2";
};

const PricingCard = (props: Props) => {
  const {
    button_label,
    button_link,
    content,
    currency,
    featured,
    monthly_price,
    name,
    services,
    yearly_price,
    type,
    layout,
  } = props || {};

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  if (layout === "Pricing-2") {
    return (
      <tr>
        <td>
          <span className="text-primary">Save 50% On Annual Subscription</span>
        </td>
        <td data-label="Free">
          <span className="h2 font-weight-bold d-inline-flex">$0</span>
          <p className="mt-10">
            Lorem ipsum dolor sit amet confsectur justo massa.
          </p>
        </td>
        <td data-label="Team">
          <span className="h2 font-weight-bold d-inline-flex">
            $
            <span
              className="data-count"
              data-count-monthly="39"
              data-count-annually="139"
            >
              39
            </span>
          </span>
          <span className="text-monthly">\Month</span>
          <span className="text-annually d-none">\Year</span>
          <p className="mt-10">
            Lorem ipsum dolor sit amet confsectur justo massa.
          </p>
        </td>
        <td data-label="Business" className="active">
          <span className="recomended">Recomended</span>

          <span className="h2 font-weight-bold d-inline-flex">
            $
            <span
              className="data-count"
              data-count-monthly="59"
              data-count-annually="159"
            >
              59
            </span>
          </span>
          <span className="text-monthly">\Month</span>
          <span className="text-annually d-none">\Year</span>
          <p className="mt-10">
            Lorem ipsum dolor sit amet confsectur justo massa.
          </p>
        </td>
        <td data-label="Enterprise">
          <span className="h2 font-weight-bold d-inline-flex">
            $
            <span
              className="data-count"
              data-count-monthly="89"
              data-count-annually="189"
            >
              89
            </span>
          </span>
          <span className="text-monthly">\Month</span>
          <span className="text-annually d-none">\Year</span>
          <p className="mt-10">
            Lorem ipsum dolor sit amet confsectur justo massa.
          </p>
        </td>
      </tr>
    );
  }

  return (
    <div ref={ref} className="rounded shadow">
      <div className="p-12">
        <span className="h2 font-bold inline-flex">
          {inView && (
            <CountUp
              className="data-count"
              end={type === "monthly" ? +monthly_price : +yearly_price}
              prefix={currency}
            />
          )}
        </span>
        <span
          className="ml-1 inline-block capitalize font-medium"
          dangerouslySetInnerHTML={{ __html: markdownify("\\" + type) }}
        />
        <h3
          className="font-semibold my-2.5"
          dangerouslySetInnerHTML={{ __html: markdownify(name) }}
        />
        <p
          className="border-b border-b-border/80 pb-5"
          dangerouslySetInnerHTML={{ __html: markdownify(content!) }}
        />

        <ul className="my-5 space-y-5">
          {(services as string[])?.map((service, i) => (
            <li key={i} className="flex items-center font-semibold text-light">
              <span className="mr-2.5 bg-[#E1F4EC] w-7 h-7 flex items-center justify-center text-[#33B27C] rounded-full">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 18 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6.125L6.91892 11L16 2"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {plainify(service)}
            </li>
          ))}
        </ul>

        <a
          href={button_link}
          className="btn btn-outline-primary w-full text-center transition ease-linear duration-300 mt-3"
          dangerouslySetInnerHTML={{ __html: button_label }}
        />
      </div>
    </div>
  );
};

export default PricingCard;
