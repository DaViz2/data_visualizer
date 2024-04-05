import { useState } from "react";
export default function ArrayTable({board}){

return(
  <table>
    <tbody>
      {board.map((row,i) => (
        <tr key={i}>
          {row.map((cell,j) => (<td key={j}>{cell}</td>))}
        </tr>
      ))}
    </tbody>
  </table>
);

}