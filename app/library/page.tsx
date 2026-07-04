import Sidebar from "@/components/layout/Sidebar";

export default function LibraryPage() {
  const books = [
     {
  title: "Class 9 English - Chapter 1",
  link: "https://drive.google.com/file/d/1gIH9KjweApoldBK5PkA5guidGgGct3Dq/preview"
},
 {
  title: "Class 9 English - Chapter 2",
  link: "https://drive.google.com/file/d/10IApbs7z_TdJ-YJaw_eYoIpWMl3i3fEu/preview"
},
 {
  title: "Class 9 English - Chapter 3",
  link: "https://drive.google.com/file/d/1lNtF0oAsaaipkDL2mnJXg_PwjGHvmh7y/preview"
},
 {
  title: "Class 9 English - Chapter 4",
  link: "https://drive.google.com/file/d/1E0FeC2hbHCiMjbbTERXNxUgBxDTSyX1d/preview"
},
 {
  title: "Class 9 English - Chapter 5",
  link: "https://drive.google.com/file/d/1oVDf6KAJ6xv2Vticlz3wYzElo30Png6q/preview"
},
 {
  title: "Class 9 English - Chapter 6",
  link: "https://drive.google.com/file/d/1aADiVfX0AWa4wt11n7VZMjNdXnQOO5uN/preview"
},
 {
  title: "Class 9 English - Chapter 7",
  link: "https://drive.google.com/file/d/1jnBl4n7Zj3yFsfgsPGoNb5s5oHjOJd-B/preview"
},
 {
  title: "Class 9 English - Chapter 8",
  link: "https://drive.google.com/file/d/1aNTrA16rWsPbzkq5MYihvz6XU2sEixOn/preview"
},
 {
  title: "Class 9 English - Appendix",
  link: "https://drive.google.com/file/d/1FCyV_ckrm3B4Qe85B2bjnqx5wrdkSOII/preview"
},
{
  title: "Class 9 Science - Chapter 1",
  link: "https://drive.google.com/file/d/1KdgGAiBc15o0SyEHWKHaQZjn3IVDDY5U/preview"
},
{
  title: "Class 9 Science - Chapter 2",
  link: "https://drive.google.com/file/d/1WMNRO38CkGifM8hrU-ejdH6OHp_iIc9z/preview"
},
{
  title: "Class 9 Science - Chapter 3",
  link: "https://drive.google.com/file/d/18w9QRHjPLUr6mY1CoUU3Wme6CBdXvhtk/preview"
},
{
  title: "Class 9 Science - Chapter 4",
  link: "https://drive.google.com/file/d/1xPpxkBunrDFi4vCLd1paXVWOi1rWcOc6/preview"
},
{
  title: "Class 9 Science - Chapter 5",
  link: "https://drive.google.com/file/d/18BjSdnpa4LT7_9DT5EMlL0SOp3PTC1RU/preview"
},
{
  title: "Class 9 Science - Chapter 6",
  link: "https://drive.google.com/file/d/1FJI-ikiCCyhpwp4-s8EVkk-QM2QSF5-l/preview"
},
{
  title: "Class 9 Science - Chapter 7",
  link: "https://drive.google.com/file/d/1HgAHPwITe-KE3FsXq5hrBMu7YQXz7Aav/preview"
},
{
  title: "Class 9 Science - Chapter 8",
  link: "https://drive.google.com/file/d/1zIMRJ4aX7NiicKEn-uDnV4kLqWC8d3vQ/preview"
},
{
  title: "Class 9 Science - Chapter 9",
  link: "https://drive.google.com/file/d/1r-ZXzhD2_vqnyXmVJ86cCgkoileC32Nt/preview"
},
{
  title: "Class 9 Science - Chapter 10",
  link: "https://drive.google.com/file/d/1SeFMBBEdMCllq5mtFkeSqhhQ31BtExBL/preview"
},
    {
  title: "Class 9 Maths - Chapter 1",
  link: "https://drive.google.com/file/d/1nNKlhHLZOm5rTzDwTI0RatpFsRJ-aa_j/preview"
},
{
  title: "Class 9 Maths - Chapter 2",
  link: "https://drive.google.com/file/d/1BNXy9eEUNV1OxVrpuhwM8WIwuMS0HaYC/preview",
},
{
  title: "Class 9 Maths - Chapter 3",
  link: "https://drive.google.com/file/d/1FQSlleeDWQmI2ZJHOMmpvwVk3k8xVBuX/preview",
},
{
  title: "Class 9 Maths - Chapter 4",
  link: "https://drive.google.com/file/d/1v3h_t0BbeNrfD_MLr1KMLAekvNfLy6ne/preview",
},
{
  title: "Class 9 Maths - Chapter 5",
  link: "https://drive.google.com/file/d/1Fnpo_R792MG-hw_eLgBpqypjq5P_kOMH/preview",
},
{
  title: "Class 9 Maths - Chapter 6",
  link: "https://drive.google.com/file/d/1e6WxOLxmryjdpZtaCcYIjhA88UkCnXi0/preview",
},
{
  title: "Class 9 Maths - Chapter 7",
  link: "https://drive.google.com/file/d/1kjEOpOslG7qnniWBHjEPMKU9qx4drj3s/preview",
},
{
  title: "Class 9 Maths - Chapter 8",
  link: "https://drive.google.com/file/d/10R76JmS3Jk8gO1a2p6_OqLFPY4ZJ904d/preview",
},

    {
      title: "Class 10 Science",
      link: "https://drive.google.com/file/d/1zdg6Qu0vPLrdwS5w_gHJiXo0C8vSKetf/preview",
    },

    {
      title: "Class 11 Physics",
      link: "https://drive.google.com/file/d/1zdg6Qu0vPLrdwS5w_gHJiXo0C8vSKetf/preview",
    },
    {
      title: "Class 12 Mathematics - Chapter  1",
      link: "https://drive.google.com/file/d/1nEWV0qdfBC5Kmu_c631dQxDVWsLSnocj/preview",
    },
    {
      title: "Class 12 Mathematics - Chapter  2",
      link: "https://drive.google.com/file/d/1xF5phv55NaQPR8YZEUIFZrXjHCQh7hMw/preview",
    },
  ];
console.log(books);
  return (
    <div className="flex">
      <Sidebar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">
              {book.title}
            </h2>

            <a
              href={book.link}
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              Open PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}