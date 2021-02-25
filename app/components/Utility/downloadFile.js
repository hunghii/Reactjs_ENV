const downloadFile = (url, reportName) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', reportName); // or any other extension
  document.body.appendChild(link);
  link.click();
};
export default downloadFile;
