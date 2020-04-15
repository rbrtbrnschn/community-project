import React, {useEffect} from "react";
import "./profile.scss"
const Stats = (props) => {
	const initialState = {
		completed:0,
		failed:0,
		currentStreak:0,
		highscore:0,
		currentTasks:0,
		perfectDays:0,
		perfectStreak: 0,

	}
	const [stats,setStats] = React.useState(initialState);
 	const { profile, onNewHighscore } = props;
	const testing = true;

	useEffect(()=>{
		if(profile.ok){
	const _stats = handleStats(profile, onNewHighscore);
	if(_stats !== initialState)setStats({...stats,..._stats});
		}
	// eslint-disable-next-line
	},[profile])
  return (
	  <div id="tabs">

	<section class="hero is-info">
  <div class="hero-body">
    <div class="container">
	    <nav class="level is-mobile">
  <div class="level-item has-text-centered">
    <div>
      <p className="heading">Completed</p>
      <p className="title">{stats.completed}</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Failed</p>
      <p class="title">{stats.completed}</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p className="heading">Highscore</p>
      <p className="title">{stats.highscore}</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p className="heading">Streak</p>
      <p className="title">{stats.currentStreak}</p>
    </div>
  </div>
</nav>
    </div>
  </div>
</section>
	  </div>
  );
};
export default Stats;

function handleStats(profile,setNewHighscore){
	const { isOwner } = profile; 
	const currentTasks = profile.tasks.length;
  	let completedCount = 0;
  	let failedCount = 0;
	let highestCurrentStreak = 0;
	let hs = profile.highscore;
  	profile.tasks.forEach(t=>{
		t.timestamps.forEach(s=>{
          		if(s.isComplete)completedCount++;
			if(s.payload === "onFail")failedCount++;
			
		})
		if(t.streak > highestCurrentStreak)highestCurrentStreak = t.streak;
		if(isOwner && highestCurrentStreak > hs){
			setNewHighscore(highestCurrentStreak);
		}
  })
 	const toBeReturned = {
		completed:completedCount,
		failed:failedCount,
		currentStreak:highestCurrentStreak,
		highscore:hs,
		currentTasks:currentTasks,
	} 
	return toBeReturned;
}


