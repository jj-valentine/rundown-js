// Q: is this actually any "BETTER" or "SAFER" than using a simple 'eval' inside callback function which runs upon receiving 'message' from global

// TODO: encrypt code (i.e. the "id" of the script tag?) → best solution: OBFUSCATION and/or MINIFICATION
export const iFrameHTML = (() => {
  const iFrameSource = (() => {
    window.addEventListener("message", e => generateNewSourceHTML(e));

    const generateNewSourceHTML = (e: any) => {
      const code = e.data, prevScript = document.getElementById("bundled-code");
      if (!code || (prevScript && code === prevScript.innerHTML)) return;
      /* remove previous '#bundled-code' script tag (if it exists) */
      if (prevScript && prevScript.parentNode) prevScript.parentNode.removeChild(prevScript);
      
      /* remove all "secondary" (i.e. user-injected) elements (all elements besides those inside our "HTML Skeleton") */
      const removeChildElements = (parent: HTMLElement) => {
        for (let i = 0; i < parent.children.length; i++) {
          const child = parent.children[i];
          if (child.id === "source" && child.tagName === "SCRIPT") continue;
          else if (child.id === "root" && child.tagName === "DIV") {
            removeChildElements(child as HTMLElement);
            continue;
          }
          parent.removeChild(child);
        }
      };
      
      removeChildElements(document.body);

      /* build and inject (within 'head' tag) new fresh '#bundled-code' script */
      const updatedScript = document.createElement("script");
      updatedScript.setAttribute("id", "bundled-code");
      updatedScript.setAttribute("type", "text/javascript");
      updatedScript.append(code);
      document.head.append(updatedScript);
    };
  }).toString();

  /* "HTML Skeleton" for 'iframe' context (i.e. bare-bones, before any "secondary" code is added/injected via auxiliary scripts or libraries such as 'React') */
  return `
    <html>
      <head>
      </head>
      <body>
        <div id="root"></div>
        <script id="source" type="text/javascript">
          "use strict"; 
          (${iFrameSource})();
        </script>
      </body>
    </html>
  `; 
})();






