export default function handler(req, res) {
  const data = {
    authors: [
      {
        authorID: 1,
        username: "helloworld",
        profileImg:
          "https://yt3.googleusercontent.com/9F29S4hVL_lbGKf3TYCRATs5oEY_wrXo6Z3cgqFnGcFhuMqEG5boI5J75vKInyF30MtL0kk1sg=s900-c-k-c0x00ffffff-no-rj",
        userSince: "2026",
        channel: "Heinz Field",
      },
    ],
    posts: [
      {
        postID: 1,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-20",
        thumbnail:
          "https://e0.365dm.com/16/07/2048x1152/nfl-james-harrison-pittsburg_3749783.jpg",
        image:
          "https://e0.365dm.com/16/07/2048x1152/nfl-james-harrison-pittsburg_3749783.jpg",
        caption: "Game day energy.",
        alt: "Football player during a game",
      },
      {
        postID: 2,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-21",
        thumbnail:
          "https://media.gettyimages.com/id/1237041374/photo/pittsburgh-pa-pittsburgh-steelers-quarterback-ben-roethlisberger-looks-down-field-for-a.jpg?s=612x612&w=gi&k=20&c=L-GhXp-X6hlpr3IDWk1QmJqGh5YrNzP2mroC7Ncby1A=",
        image:
          "https://media.gettyimages.com/id/1237041374/photo/pittsburgh-pa-pittsburgh-steelers-quarterback-ben-roethlisberger-looks-down-field-for-a.jpg?s=612x612&w=gi&k=20&c=L-GhXp-X6hlpr3IDWk1QmJqGh5YrNzP2mroC7Ncby1A=",
        caption: "Game day energy.",
        alt: "Ben Roethlisberger throwing a pass",
      },
      {
        postID: 3,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-22",
        thumbnail:
          "https://tse3.mm.bing.net/th/id/OIP.t8g6U9_QseZwEJF8k5FvYAHaE9?rs=1&pid=ImgDetMain&o=7&rm=3",
        image:
          "https://tse3.mm.bing.net/th/id/OIP.t8g6U9_QseZwEJF8k5FvYAHaE9?rs=1&pid=ImgDetMain&o=7&rm=3",
        caption: "Game day energy.",
        alt: "Le'Veon Bell running with the ball",
      },
      {
        postID: 4,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-23",
        thumbnail:
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/05/20/16845620362500.jpg",
        image:
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/05/20/16845620362500.jpg",
        caption: "Game day energy.",
        alt: "Antonio Brown catching a pass",
      },
      {
        postID: 5,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-24",
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmj7sSi_uPNuyBug4ZBYfKZOV-R3FH-Nw3Mg&s",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmj7sSi_uPNuyBug4ZBYfKZOV-R3FH-Nw3Mg&s",
        caption: "Game day energy.",
        alt: "Antonio Brown catching a pass",
      },
      {
        postID: 6,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-25",
        thumbnail:
          "https://images2.minutemediacdn.com/image/upload/c_crop,x_1154,y_277,w_5497,h_3092/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_steelers/01k8y3h4ecngwp63phkc.jpg",
        image:
          "https://images2.minutemediacdn.com/image/upload/c_crop,x_1154,y_277,w_5497,h_3092/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_steelers/01k8y3h4ecngwp63phkc.jpg",
        caption: "Game day energy.",
        alt: "Steelers player during a game",
      },
      {
        postID: 7,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-26",
        thumbnail:
          "https://static.clubs.nfl.com/image/upload/t_person_squared_mobile/f_png/v1749650074/steelers/vgsqx5el0iinquytagme.png",
        image:
          "https://static.clubs.nfl.com/image/upload/t_person_squared_mobile/f_png/v1749650074/steelers/vgsqx5el0iinquytagme.png",
        caption: "Game day energy.",
        alt: "Steelers player portrait graphic",
      },
      {
        postID: 8,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-27",
        thumbnail:
          "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_375,w_2320,h_1305/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_steelers/01hy3a35y61yaenp4vc6.jpg",
        image:
          "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_375,w_2320,h_1305/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_steelers/01hy3a35y61yaenp4vc6.jpg",
        caption: "Game day energy.",
        alt: "Steelers player in action",
      },
      {
        postID: 9,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-28",
        thumbnail: "https://www.sportsnet.ca/wp-content/uploads/2023/12/TJ-Watt-768x432.jpg",
        image: "https://www.sportsnet.ca/wp-content/uploads/2023/12/TJ-Watt-768x432.jpg",
        caption: "Game day energy.",
        alt: "TJ Watt during a game",
      },
      {
        postID: 10,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-29",
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_-gfg0zY5E8QkG1DKiWeYjuaNxKESE_Aqw&sv",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_-gfg0zY5E8QkG1DKiWeYjuaNxKESE_Aqw&sv",
        caption: "Game day energy.",
        alt: "Steelers player on the field",
      },
      {
        postID: 11,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-30",
        thumbnail:
          "https://e0.365dm.com/16/07/2048x1152/nfl-james-harrison-pittsburg_3749783.jpg",
        image:
          "https://e0.365dm.com/16/07/2048x1152/nfl-james-harrison-pittsburg_3749783.jpg",
        caption: "Friday night lights.",
        alt: "Steelers defender on the field",
      },
      {
        postID: 12,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-03-31",
        thumbnail:
          "https://media.gettyimages.com/id/1237041374/photo/pittsburgh-pa-pittsburgh-steelers-quarterback-ben-roethlisberger-looks-down-field-for-a.jpg?s=612x612&w=gi&k=20&c=L-GhXp-X6hlpr3IDWk1QmJqGh5YrNzP2mroC7Ncby1A=",
        image:
          "https://media.gettyimages.com/id/1237041374/photo/pittsburgh-pa-pittsburgh-steelers-quarterback-ben-roethlisberger-looks-down-field-for-a.jpg?s=612x612&w=gi&k=20&c=L-GhXp-X6hlpr3IDWk1QmJqGh5YrNzP2mroC7Ncby1A=",
        caption: "Locked in before kickoff.",
        alt: "Quarterback preparing to throw",
      },
      {
        postID: 13,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-04-01",
        thumbnail:
          "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_375,w_2320,h_1305/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_steelers/01hy3a35y61yaenp4vc6.jpg",
        image:
          "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_375,w_2320,h_1305/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_steelers/01hy3a35y61yaenp4vc6.jpg",
        caption: "Defense showed up today.",
        alt: "Steelers defensive play",
      },
      {
        postID: 14,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-04-02",
        thumbnail: "https://www.sportsnet.ca/wp-content/uploads/2023/12/TJ-Watt-768x432.jpg",
        image: "https://www.sportsnet.ca/wp-content/uploads/2023/12/TJ-Watt-768x432.jpg",
        caption: "Big play moment.",
        alt: "TJ Watt celebrating during a game",
      },
      {
        postID: 15,
        authorID: 1,
        title: "Steelers Game Day",
        dateTaken: "2026-04-03",
        thumbnail:
          "https://static.clubs.nfl.com/image/upload/t_person_squared_mobile/f_png/v1749650074/steelers/vgsqx5el0iinquytagme.png",
        image:
          "https://static.clubs.nfl.com/image/upload/t_person_squared_mobile/f_png/v1749650074/steelers/vgsqx5el0iinquytagme.png",
        caption: "Wrapped up the week with another post.",
        alt: "Steelers player profile image",
      },
    ],
  };

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(data);
}