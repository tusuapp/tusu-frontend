import {RadioGroup} from "@headlessui/react";

import {useState} from "react";
import {useSelector} from "react-redux";
import {selectAuth} from "../../../../features/auth/authSlice";
import moment from "moment";

const Timeslots = ({data, onChange, setSelectedSlot, selectedDate}: any) => {
    const [timeslot, setTimeslot] = useState("");
    const {user} = useSelector(selectAuth);

    let slotEmpty = 0;
    const Timeslot = ({timePeriod, isChecked, isDisabled, id}: any) => {
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
                {data.map((timeslot: any) => {

                    const from = moment(selectedDate + "T" + timeslot.start + user.timezoneOffset).utcOffset(user.timezoneOffset);
                    const to = moment.utc().utcOffset(user.timezoneOffset);
                    const dd = moment.duration(to.diff(from)).asMinutes()

                    if (dd > 0) {
                        return (<></>)
                    }

                    if (!timeslot.is_booked) {
                        slotEmpty++;
                        return (<div className="mb-5">

                            <RadioGroup.Option
                                value={{start: timeslot.start, end: timeslot.end}}
                                disabled={timeslot.is_booked}
                            >
                                {({active}) => (
                                    <Timeslot
                                        timePeriod={{start: timeslot.start, end: timeslot.end}}
                                        isChecked={active}
                                        isDisabled={timeslot.is_booked}
                                        id={timeslot.id}
                                    />
                                )}
                            </RadioGroup.Option>
                        </div>)
                    } else {

                    }


                })}

                {(data.length && slotEmpty == 0) ? (<p className={"mt-3"}> Slot not available / booked </p>) : ""}

            </RadioGroup>
        </>
    );
};

export default Timeslots;
