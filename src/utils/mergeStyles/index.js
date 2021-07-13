export const mergeStyles = (...styles) => {
    const s = [];
  
    styles.forEach((style) => {
      if (!style) return;
  
      if (Array.isArray(style)) {
        s.push(...style);
        return;
      }
  
      s.push(style);
    });
  
    return s.filter(Boolean);
};
  