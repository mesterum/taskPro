const Search = ({ width, height, fillColor, strokeColor }) => {
    return (
      <svg
        width={width || '14px'}
        height={height || '14px'}
        viewBox="0 0 32 32"
        fill={fillColor || 'none'}
        stroke={strokeColor || null}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 13.317c0 7.345 5.975 13.314 13.314 13.314 3.381 0 6.473-1.271 8.826-3.355l8.485 8.485c0.157 0.157 0.36 0.236 0.57 0.236s0.413-0.079 0.57-0.236c0.315-0.314 0.315-0.819 0-1.134l-8.491-8.485c2.084-2.352 3.355-5.438 3.355-8.826 0-7.345-5.975-13.314-13.314-13.314s-13.314 5.969-13.314 13.314zM25.022 13.317c0 6.454-5.255 11.708-11.708 11.708s-11.708-5.255-11.708-11.708 5.255-11.708 11.708-11.708 11.708 5.248 11.708 11.708z"></path>
      </svg>
    );
  };
  
  export default Search;