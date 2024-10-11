import {RadioGroup} from "@headlessui/react";

import {useState} from "react";
import moment from "moment";
import {useSelector} from "react-redux";
import {selectAuth} from "../../../../features/auth/authSlice";

const TimeSlots = ({data, onChange, setSelectedSlot, selectedDate}: any) => {
    const [timeslot, setTimeslot] = useState("");
    

    let slotEmpty = 0;

    const selDate = moment(selectedDate).format("YYYY-MM-DD");
    const TimeSlot = ({timePeriod, isChecked, isDisabled, id}: any) => {
        return (
            <div
                className={isChecked ? "tutor__timeslot--active" : "tutor__timeslot"}
                onClick={() => setSelectedSlot(id)}
            >
                {/* {isDisabled && "Booked"} */}
                {timePeriod.start} - {timePeriod.end}
            </div>
        );
    };


    return (
        <>
            <RadioGroup value={"sdds"} onChange={onChange}>
                {data.map((timeslot: any, inx: number) => {

                    const from = moment(selDate + "T" + timeslot.start);
                    const to = moment();
                    const dd = moment.duration(to.diff(from)).asMinutes()

                    if (dd > 0) {
                        return (<></>)
                    }

                    if (!timeslot.is_booked) {
                        slotEmpty++;
                        return (
                            <div className="mb-5" key={inx}>
                                <RadioGroup.Option
                                    value={{start: timeslot.start, end: timeslot.end}}
                                    disabled={timeslot.is_booked}
                                >
                                    {({active}) => (
                                        <TimeSlot
                                            timePeriod={{start: timeslot.start, end: timeslot.end}}
                                            isChecked={active}
                                            isDisabled={timeslot.is_booked}
                                            id={timeslot.id}
                                        />
                                    )}
                                </RadioGroup.Option>
                            </div>
                        );
                    }
                })}

                {(data?.length && slotEmpty == 0) ? (<p className={"mt-3"}> Slot not available / booked </p>) : ""}


            </RadioGroup>
        </>
    );

};

export default TimeSlots;
