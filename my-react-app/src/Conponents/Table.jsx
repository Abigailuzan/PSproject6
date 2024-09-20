import React from 'react'
import '../Styles/AboutUs.css'
function Table() {
  return (
      <div className="grid-item">
        <div id="prices">
               {/* Table displaying movie categories and their price ranges */}
               <table>
                 <thead>
                   <tr>
                     <th>Category</th>
                     <th>Min price</th>
                     <th>Max price</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Action</td>
                     <td>10$</td>
                     <td>100$</td>
                   </tr>
                   <tr>
                     <td>Comedy</td>
                     <td>5$</td>
                     <td>150$</td>
                   </tr>
                   <tr>
                     <td>Drama</td>
                     <td>15$</td>
                     <td>75$</td>
                   </tr>
                   <tr>
                     <td>Horror</td>
                     <td>6$</td>
                     <td>99$</td>
                   </tr>
                   <tr>
                     <td>Science Fiction</td>
                     <td>20$</td>
                     <td>150$</td>
                   </tr>
                   <tr>
                     <td>Fantasy</td>
                     <td>2$</td>
                     <td>144$</td>
                   </tr>
                   <tr>
                     <td>Musical</td>
                     <td>8$</td>
                     <td>134$</td>
                   </tr>
                   <tr>
                     <td>Romance</td>
                     <td>10$</td>
                     <td>90$</td>
                   </tr>
                   <tr>
                     <td>Documentary</td>
                     <td>10$</td>
                     <td>166$</td>
                   </tr>
                   <tr>
                     <td>Animation</td>
                     <td>56$</td>
                     <td>200$</td>
                   </tr>
                   <tr>
                     <td>Thriller</td>
                     <td>17$</td>
                     <td>80$</td>
                   </tr>
                 </tbody>
               </table>
        </div>
      </div>
     
  )
}

export default Table