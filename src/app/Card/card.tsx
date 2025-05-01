"use client";
// nếu dùng useState trong react thì hãy dùng lệnh này

import { useState } from "react";
import "./card.css";
import custom from "./custom.module.scss";
import clsx from "clsx";
export default function Card() {
  const [expanding, setExpanding] = useState(false);
  return <div className={clsx("card", { [custom.card]: expanding })}>card</div>;
  //   return <div className={`card ${custom.card}`}>card</div>;
  //   ${custom.card} này chỉ tác động đến đúng cái card này giống kiểu custom riêng đấy
}
