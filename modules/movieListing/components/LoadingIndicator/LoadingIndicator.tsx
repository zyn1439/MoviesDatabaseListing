import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function CardSkeleton() {
  return (
    <div className="loadingDiv">
      <LoadingOutlined className="loadingIcon" />
    </div>
  );
}
