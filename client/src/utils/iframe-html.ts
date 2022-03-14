// Q: is this actually any "BETTER" or "SAFER" than using a simple 'eval' inside callback function which runs upon receiving 'message' from global
// TODO: encrypt code (i.e. the "id" of the script tag?) → best solution: OBFUSCATION and/or MINIFICATION
export const iFrameHTML = ((): string => {
  const iFrameSource = ((): void => {
    window.addEventListener("message", e => renewSourceHTML(e));

    const renewSourceHTML = (e: MessageEvent<any>): void => {
      const userCode = e.data, prevScript = document.getElementById("bundled-code");
      if (!userCode || (prevScript && userCode === prevScript.innerHTML)) return;

      /* remove all "secondary" (i.e. user-injected) elements from 'body' -- including '#root' node
      (replacing it entirely is cleaner than attempting to access and individually delete its direct decendants + children) */
      ((): void => {
        const parents: Array<HTMLHeadElement | HTMLElement> = [document.head as HTMLElement, document.body];
        for (let parent of parents) {
          const children = parent.children;
          for (let i = 0; i < children.length; i++) {
            let child = children[i] as HTMLElement;
            if (child.id === "source" && child.tagName === "SCRIPT") continue;
            parent.removeChild(child);
          } 
        }
      })();

      /* build and inject new '#root' DIV into 'body' element (if one doesn't already exist) */
      if (!document.getElementById("root")) {
        const root = document.createElement("div");
        root.setAttribute("id", "root");
        document.body.append(root);
      }

      const handleInputCodeErrors = ((error: any): void => {
        console.error("User Input Error: ", error);
        const errors = document.createElement("aside");
        errors.setAttribute("id", "errors");
        errors.innerHTML = error;
        const root = document.getElementById("root");
        if (root) root.append(errors);
      }).toString();

      /* build and inject new '#bundled-code' SCRIPT into 'head' element (if one doesn't already exist) */
      if (!document.getElementById("bundled-code")) {
        const updatedScript = document.createElement("script");
        updatedScript.setAttribute("id", "bundled-code");
        updatedScript.setAttribute("type", "text/javascript");
        // inject bundled code into 'try/catch' block for error handling purposes (within 'iframe' context)
        updatedScript.append(`try { ${userCode}; } catch (err) { (${handleInputCodeErrors})(err); }`);
        document.head.append(updatedScript);
      }
    };
  }).toString();

  /* "HTML Skeleton" for 'iframe' context (i.e. bare-bones, before any "secondary" code is added/injected via auxiliary scripts or libraries such as 'React') */
  return `
    <html>
      <head>
      </head>
      <body>
        <script id="source" type="text/javascript">
          "use strict";
          (${iFrameSource})();
        </script>
      </body>
    </html>
  `; 
})();






