import React, { useState } from "react";

interface AccordianItemProps {
  title: string;
  body: string;
  key: any;
}

const AccordianItem: React.FC<AccordianItemProps> = ({ title, body, key }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed faq-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`question-${key}`}
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
          </button>
        </h2>
        <div
          id={`question-${key}`}
          className={
            isOpen ? "accordion-collapse" : "accordion-collapse collapse"
          }
          aria-labelledby="flush-headingOne"
          data-bs-parent="#faq-accordion"
        >
          <div className="accordion-body">{body}</div>
        </div>
      </div>
    </>
  );
};

export default AccordianItem;
