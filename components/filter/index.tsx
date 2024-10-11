import React, {useState} from "react";

interface FilterProps {
    options: any;
    onChange: any;
}

const optionsDummy = [
    {label: "ALL ", value: "all"},
    {label: "WEEK", value: "week"},
    {label: "MONTHLY", value: "month"},
    {label: "YEARLY", value: "year"},
];

const Filter: React.FC<FilterProps> = ({options, onChange}) => {
    const [activeFilter, setActiveFilter] = useState(0);

    const handleChange = (index: any) => {
        setActiveFilter(index);
        onChange(optionsDummy[index]);
    };

    return (
        <>
            <div className="filter-wrapper mt-4">
                {optionsDummy.map((filter, index) =>
                    activeFilter === index ? (
                        <div onClick={() => handleChange(index)} className="item active">
                            {filter.label}
                        </div>
                    ) : (
                        <div onClick={() => handleChange(index)} className="item">
                            {filter.label}
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default Filter;
