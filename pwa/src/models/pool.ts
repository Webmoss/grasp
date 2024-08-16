export interface poolObject {
  poolId?: number;
  stakedAmount?: string | number;
  rewardPoolPerHour?: number;
  rewardPoolPerDay?: number;
  rewardsPerHour?: string | number;
  rewardsPerDay?: string | number;
  poolAprDaily?: string | number;
  poolAprWeekly?: string | number;
  capPerPosition?: number;
  startTimestampHour?: string;
  endTimestampHour?: string;
}
