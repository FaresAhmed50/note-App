// // var x; // decliration
//
//
// // let , var , const
// // variable decliration
//
// // console.log(x);
// //
// //
// // /*
// // global scope
// //
// // * */
// // x = 5; //assign
// // console.log(x);
// //
// //
// // let z =5;
// // console.log(z);
// //
// // const y = 5;
//
// // function
// // void ==> no return to any code
//
// //
// // function sum(x,y){
// //   console.log(x+y);
// //   return x+y;
// // }
// //
// // // function decliration
// // let s = () => {
// //   console.log("hello world")
// // }
// //
// //
// //
// // let d = sum(5,5) // fire function , calling function
// // console.log(d)
// // s();
//
//
// // api
//
//
// // async function apiFeatch() {
// //
// //   const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
// //     .then(
// //       res => {
// //       const x = res.json()
// //       console.log(x);
// //     }
// //     )// complete
// //     .catch((err) => {console.log(err)}); // error
// // }
// // apiFeatch()
//
//
//
// const apiUrl = "https://jsonplaceholder.typicode.com/comments";
// const container = document.getElementById("comments-container");
//
// var apires = []
//
// async function callApi() {
//
//   const response = await fetch(apiUrl)
//     .then(result => {
//     const res = result.json();
//   }).then(data => {
//       data.forEach(comment => {
//         const div = document.createElement("div");
//         div.className = "comment";
//         div.innerHTML = `
//             <h3>${comment.name}</h3>
//             <p class="email">${comment.email}</p>
//             <p>${comment.body}</p>
//           `;
//         container.appendChild(div);
//       });
//     })
//     .catch(error => {
//     console.log(error);
//     })
// }
//
//
//
// callApi()
