import { React, useEffect, useState } from "react";
import classes from "./MainPage.module.scss";
import axios from "axios";
import Temp from "../../images/user (2).png";
import Course from "../../components/Course/Course";

const MainPage = ({ token }) => {
  const [seeAll, setSeeAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // const showMenuHandler = () => {
  //   setIsShowOptionsMenu(false);
  //   setIsShowMenu(!isShowMenu);
  // };

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_API_ADDRESS}idea/filter/`
  //       );
  //       console.log(res);
  //       const list = res.data;
  //       list.sort((a, b) =>
  //         a.views_count !== null &&
  //         b.views_count !== null &&
  //         a.views_count > b.views_count
  //           ? 1
  //           : a.views_count !== null &&
  //             b.views_count !== null &&
  //             b.views_count > a.views_count
  //           ? -1
  //           : 0
  //       );
  //       setUserIdeas(list);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUserData();
  // }, []);

  // const applyFilter = async (filterItem) => {
  //   try {
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_API_ADDRESS}idea/filter/`,
  //       {
  //         classification: [filterItem],
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     setUserIdeas(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className={classes.container}>
      <span className={`${classes.backCricle} ${classes.red}`}></span>
      <span className={`${classes.backCricle} ${classes.green}`}></span>
      <span className={`${classes.backCricle} ${classes.blue}`}></span>
      <span className={`${classes.backCricle} ${classes.pink}`}></span>
      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAll(true)}
          disabled={seeAll}
        >
          See All
        </button>
      </div>

      <div className={classes.coursesContainer}>
        <div className={classes.courses}>
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
          <Course
            title="tile"
            avatar="uploads/1689302343450_.jpg"
            goal="goal"
            abstract="abstract"
          />
        </div>
        {/* <div className={`${classes.ideas} ${seeAll && classes.scrollable}`}>
            {isLoading ? (
              <Skeleton type="Idea" />
            ) : (
              <>
                {seeAll
                  ? userIdeas.map((item, index) => (
                      <Idea
                        type="MainPage"
                        key={index}
                        uuid={item.uuid}
                        token={token}
                        title={item.title}
                        image={item.image}
                        goal={item.goal}
                        details={item.details}
                        likes={item.likes_count}
                        views={item.views_count}
                        comments={item.comments_count}
                        isShowLikes={item.likes_count === null ? false : true}
                        isComments={item.comments_count === null ? false : true}
                        isShowViews={item.views_count === null ? false : true}
                      />
                    ))
                  : userIdeas.map(
                      (item, index) =>
                        index < 6 && (
                          <Idea
                            type="MainPage"
                            key={index}
                            uuid={item.uuid}
                            token={token}
                            title={item.title}
                            image={item.image}
                            goal={item.goal}
                            details={item.details}
                            likes={item.likes_count}
                            views={item.views_count}
                            comments={item.comments_count}
                            isShowLikes={
                              item.likes_count === null ? false : true
                            }
                            isComments={
                              item.comments_count === null ? false : true
                            }
                            isShowViews={
                              item.views_count === null ? false : true
                            }
                          />
                        )
                    )}
              </>
            )}
          </div> */}
      </div>
    </div>
  );
};

export default MainPage;
