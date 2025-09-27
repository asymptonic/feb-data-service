export type Datapoint = {
  '': number;
  TimeStamp: number;
  D1_Commanded_Torque: number;
  D1_DC_Bus_Voltage: number;
  D2_Motor_Speed: number;
  IVT_Result_I: number;
  Wheel_Speed: number;
  Power: number;
  Incremental_Energy: number;
  Total_Energy: number;
  adjusted_time_ms: number;
  time_on_video: string;
};
