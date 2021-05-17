import { memo } from 'react';
import Countdown from 'react-countdown';
import { IoIosTimer } from 'react-icons/io';

// const getTestDuration = (timeString) =>
//   new Date("1970-01-01T" + timeString + "Z").getTime();

const CountDownTimer = ({ testSubmit, duration }) => {
	return (
		<div className="countdown-div">
			<p>
				<IoIosTimer /> Time Left :{' '}
			</p>
			<Countdown
				className="quiz-countdown"
				date={Date.now() + duration}
				onComplete={testSubmit}
			/>
		</div>
	);
};

export default memo(CountDownTimer);
