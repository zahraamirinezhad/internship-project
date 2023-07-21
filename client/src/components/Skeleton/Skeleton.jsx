import React from "react";
import classes from "./Skeleton.module.scss";

export default function Skeleton({ type }) {
  const IdeaSkeleton = () => (
    <div className={classes.container}>
      <div className={classes.ideaInfo}>
        <div className={classes.ideaTitle}></div>
        <div className={classes.ideaGoal}></div>
        <div className={classes.ideaDesc}></div>
      </div>
      <div className={classes.ideaImage}></div>
    </div>
  );

  const ToolbarSkeleton = () => (
    <div className={classes.options}>
      <div className={classes.account}></div>
      <div className={classes.userImage}></div>
    </div>
  );

  const ProfileStructureSkeleton = () => (
    <div className={classes.profileStructureSidebar}>
      <div className={classes.profileStructureOption}></div>
      <div className={classes.profileStructureOption}></div>
      <div className={classes.profileStructureOption}></div>
      <div className={classes.profileStructureOption}></div>
    </div>
  );

  if (type === "Course") return Array(6).fill(<IdeaSkeleton />);
  if (type === "ProfileStructureSkeleton") return <ProfileStructureSkeleton />;
  if (type === "Toolbar") return <ToolbarSkeleton />;
}
