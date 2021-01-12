window.addEventListener("load", start, false);

function start() {
  const selection = document.getElementById("puzzleSize");
  var numberOfRowElements;
  var numberOfColumnElements;
  var sizeCanvas = window.visualViewport.width;
  const container = document.getElementById("container");

  window.addEventListener("resize", () => {
    sizeCanvas = window.visualViewport.width;
  }, false);


  var imgPath;
  const selectionObjectArray = [
    {
      numberElementsPerRow: 2,
      numberElementsPerColumn: 2,
      path: "img/FourPieces/",
    },
    {
      numberElementsPerRow: 3,
      numberElementsPerColumn: 3,
      path: "img/NinePieces/",
    },
    {
      numberElementsPerRow: 4,
      numberElementsPerColumn: 3,
      path: "img/TwelvePieces/",
    },
    {
      numberElementsPerRow: 4,
      numberElementsPerColumn: 4,
      path: "img/SixTeenPieces/",
    },
  ];

  function joinningPieces() {
    var listPosition = disorderArray(
      numberOfRowElements,
      numberOfColumnElements
    );
    var container = document.querySelector("#container");
    for (let i = 1; i <= numberOfRowElements * numberOfColumnElements; i++) {
      var divElement = document.createElement("div");
      divElement.setAttribute("class", "pieces");
      divElement.setAttribute("id", "div_" + i);
      divElement.addEventListener("drop", drop, false);
      divElement.addEventListener("dragover", allowDrop, false);
      var image = document.createElement("img");
      image.src = imgPath + (listPosition[i - 1] + 1) + ".jpg";
      image.setAttribute("draggable", "true");
      image.setAttribute("id", "img_" + (listPosition[i - 1] + 1));
      image.addEventListener("dragstart", drag, false);
      divElement.appendChild(image);
      container.appendChild(divElement);
    }
  }

  function adjustWidth(numberOfRowElements) {
    var imageList = document
      .querySelector("#container")
      .getElementsByTagName("img");
    var array = Array.from(imageList);
    var sizePiece = Math.floor(sizeCanvas / 2.5 / numberOfRowElements); 
    container.style.width = `${sizePiece * numberOfRowElements + 10}px`; 
    array.forEach((element) => {
      element.setAttribute(
        "width",
        `${sizePiece}px`
      );
    });
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var outerElement = getImageInsideElement(document.getElementById(data));
    var parentOuterElement = outerElement.parentElement;
    var innerElement = getImageInsideElement(
      document.getElementById(ev.target.id)
    );
    var parentInnerElement = innerElement.parentElement;
    parentOuterElement.appendChild(innerElement);
    parentInnerElement.appendChild(outerElement);
  }

  function getImageInsideElement(element) {
    if (element.nodeName == "IMG") {
      return element;
    }
    if (element.nodeName != "IMG") {
      return element.getElementsByTagName("img")[0];
    }
  }

  function disorderArray(numberOfRows, numberOfColumns) {
    var arrayNums = new Array(numberOfColumns * numberOfRows);

    for (let i = 0; i < numberOfRows * numberOfColumns; i++) {
      arrayNums[i] = i;
    }
    randNums = [];
    i = numberOfColumns * numberOfRows;
    j = 0;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      randNums.push(arrayNums[j]);
      arrayNums.splice(j, 1);
    }
    return randNums;
  }

  document.getElementById("newGame").addEventListener(
    "click",
    () => {
      document.getElementById("getSolution").style.visibility = "visible";
      for (let i = 0; i < selectionObjectArray.length; i++) {
        if (selection[i].selected) {
          numberOfRowElements = selectionObjectArray[i].numberElementsPerRow;
          numberOfColumnElements =
            selectionObjectArray[i].numberElementsPerColumn;
          imgPath = selectionObjectArray[i].path;
        }
      }
      var container = document.querySelector("#container");
      container.innerHTML = "";
      joinningPieces();
      adjustWidth(numberOfRowElements);
    },
    false
  );

  document.getElementById("getSolution").addEventListener(
    "click",
    () => {
      let imageList = document
        .querySelector("#container")
        .getElementsByTagName("img");
      let divList = document
        .querySelector("#container")
        .getElementsByTagName("div");
      let i = 0;
      for (const image of imageList) {
        if (
          image.getAttribute("id").split("_")[1] !=
          divList[i].getAttribute("id").split("_")[1]
        ) {
          window.alert("No es correcto");
          return;
        }
        i++;
      }
      window.alert("Enhorabuena. Ha resuelto el puzzle");
    },
    false
  );
}
