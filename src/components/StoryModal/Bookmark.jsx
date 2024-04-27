const Bookmark = ({ fillColor = "#fff", handleClick }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 512 512"
      version="1.1"
      fill="#000000"
      onClick={handleClick}
      role="button"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>bookmark-filled</title>{" "}
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          {" "}
          <g
            id="icon"
            fill={fillColor}
            transform="translate(128.000000, 64.000000)"
          >
            {" "}
            <polygon id="Path" points="256 0 256 384 128 298.666667 0 384 0 0">
              {" "}
            </polygon>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default Bookmark;
