import React, {useEffect} from "react";

const Stats = (props) => {
	const initialState = {
		completed:0,
		failed:0,
		currentStreak:0,
		highscore:0
	}
	const [stats,setStats] = React.useState(initialState);
 	const { profile } = props;

	useEffect(()=>{
	const _stats = handleStats(profile);
	if(_stats !== initialState)setStats({...stats,..._stats});
	
	},[profile])
  return (
    <nav className="level is-mobile">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">#Completed</p>
          <p className="title">{stats.completed}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">#Failed</p>
          <p className="title">{stats.failed}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Highest Streak</p>
          <p className="title">{stats.highscore}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Current Streak</p>
          <p className="title">{stats.currentStreak}</p>
        </div>
      </div>
    </nav>
  );
};
export default Stats;

function handleStats(profile){
  	let completedCount = 0;
  	let failedCount = 0;
	let highestCurrentStreak = 0 ;
  	profile.tasks.forEach(t=>{
		t.timestamps.forEach(s=>{
          		if(s.isComplete)completedCount++;
			if(s.payload === "onFail")failedCount++;
			
		})
		if(t.streak > highestCurrentStreak)highestCurrentStreak = t.streak;
  })
 	const toBeReturned = {
		completed:completedCount,
		failed:failedCount,
		currentStreak:highestCurrentStreak
	} 
	return toBeReturned;
}


