const organizeReverseChronological = (array) => {
  return array.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
};

export default organizeReverseChronological;
