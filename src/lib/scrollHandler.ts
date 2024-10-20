// src/lib/scrollHandler.ts
export const handleScroll = (fetchMore: () => void) => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
  
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchMore();
    }
  };
  