
class Node {

    value;

    left;
    right;

    leftString1;
    leftString2;
    rightString1;
    rightString2;

    constructor(value, leftString1, leftString2, rightString1, rightString2) {
        this.value = value;
        this.leftString1 = leftString1;
        this.rightString1 = rightString1;
        this.leftString2 = leftString2;
        this.rightString2 = rightString2;

        this.left = null;
        this.right = null;
    }
}

class Tree {
    head;
    contador;
    error;

    constructor() {
        this.head = null;
        this.contador = 0;
        this.error = false;
    }

    insertNode(value, leftString1, leftString2, rightString1, rightString2, valueParent = null, direction = null) {
        if (valueParent === null) {
            this.head = new Node(value, leftString1, leftString2, rightString1, rightString2);
        } else {

            if (this.findNode(this.head, value) !== null) {
                this.error = true;
                //this.head = null;
                //alert("Por favor revise, hay letras repetidas");
            } else {
                var headNode = this.findNode(this.head, valueParent);

                if (headNode !== null) {
                    if (direction === "left") {
                        headNode.left = new Node(value, leftString1, leftString2, rightString1, rightString2);
                    } else {
                        headNode.right = new Node(value, leftString1, leftString2, rightString1, rightString2);
                    }
                } else {
                    //alert("El nodo cabeza con valor " + valueParent + " no existe");
                }
            }
        }
    }

    findNode(head, value) {//Recorre en preorden
        if (head === null) {
            return null;
        } else if (head.value === value) {
            return head;
        } else {
            var resLeft = this.findNode(head.left, value);
            var resRight = this.findNode(head.right, value);

            if (resLeft !== null) {
                return resLeft;
            } else {
                return resRight;
            }
        }
    }

    toHTML(head,color) {

        if (head === null) {
            return '<li><div class="px-1">*</div></li>';
        } else {

            var htmlLeft = this.toHTML(head.left,color);
            var htmlRight = this.toHTML(head.right,color);


            return '<li>' +
                    '<div>' +
                    '<table class="table table-bordered table-dark table-sm">' +
                    '<thead class="thead-dark">' +
                    '<tr>' +
                    '<th colspan="2">' + head.value + '</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td class="bg-primary px-2">' + head.leftString1 + '</td>' +
                    '<td class="bg-primary px-2">' + head.leftString2 + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="bg-'+color+' px-2">' + head.rightString1 + '</td>' +
                    '<td class="bg-'+color+' px-2">' + head.rightString2 + '</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '<ul>' +
                    htmlLeft +
                    htmlRight +
                    '</ul>' +
                    '</li>';
        }
    }

    setTreePostOrder(strInOrder, strPostOrder, parent = null, direction = null) {
        if (strInOrder.length === 0 && strPostOrder.length === 0) {
            return null;
        } else {

            var rootChar = strPostOrder.charAt(strPostOrder.length - 1);
            //alert(rootChar);

            var rootPos = strInOrder.indexOf(rootChar);

            if (rootPos !== -1) {

                var strLeftIn = strInOrder.substr(0, rootPos);
                var strRightIn = strInOrder.substr(rootPos + 1);

                var strLeftPos = strPostOrder.substr(0, strLeftIn.length);
                var strRightPos = strPostOrder.substr(strLeftIn.length, strRightIn.length);
                //console.log("root=" + rootChar + " strLeftIn= " + strLeftIn + " strRightIn= " + strRightIn + " strLeftPos= " + strLeftPos + " strRightPos= " + strRightPos);

                if (this.contador === 0)
                {
                    this.insertNode(rootChar, strLeftIn, strRightIn, strLeftPos, strRightPos, null, null);
                    this.contador++;
                } else {
                    this.insertNode(rootChar, strLeftIn, strRightIn, strLeftPos, strRightPos, parent, direction);
                }
                var resLeft = this.setTreePostOrder(strLeftIn, strLeftPos, rootChar, "left");
                var resRight = this.setTreePostOrder(strRightIn, strRightPos, rootChar, "right");
            } else {
                this.error = true;
                //alert("error");
                return null;
            }
        }
    }

    setTreePreOrder(strInOrder, strPreOrder, parent = null, direction = null) {
        if (strInOrder.length === 0 && strPreOrder.length === 0) {
            return null;
        } else {

            var rootChar = strPreOrder.charAt(0);
            //alert(rootChar);

            var rootPos = strInOrder.indexOf(rootChar);

            if (rootPos !== -1) {

                var strLeftIn = strInOrder.substr(0, rootPos);
                var strRightIn = strInOrder.substr(rootPos + 1);

                var strLeftPre = strPreOrder.substr(1, strLeftIn.length);
                var strRightPre = strPreOrder.substr(strLeftIn.length + 1, strRightIn.length);
                //console.log("root=" + rootChar + " strLeftIn= " + strLeftIn + " strRightIn= " + strRightIn + " strLeftPos= " + strLeftPre + " strRightPos= " + strRightPre);

                if (this.contador === 0)
                {
                    this.insertNode(rootChar, strLeftIn, strRightIn, strLeftPre, strRightPre, null, null);
                    this.contador++;
                } else {
                    this.insertNode(rootChar, strLeftIn, strRightIn, strLeftPre, strRightPre, parent, direction);
                }
                var resLeft = this.setTreePreOrder(strLeftIn, strLeftPre, rootChar, "left");
                var resRight = this.setTreePreOrder(strRightIn, strRightPre, rootChar, "right");
            } else {
                this.error = true;
                //alert("error");
                return null;
            }
        }

    }
}

var tree = new Tree();

//console.log(tree.head);

function submitForm() {
    tree.error = false;
    $("#inOrderSpan").html();
    $("#preOrderSpan").html();
    $("#postOrderSpan").html();

    if ($("#postOrderSel").is(':checked')) {
        tree.setTreePostOrder($("#inOrderTxt").val(), $("#postOrderTxt").val());
        var color = "danger";
    } else {
        tree.setTreePreOrder($("#inOrderTxt").val(), $("#preOrderTxt").val());
        var color = "success";
    }

    if (tree.error) {
        alert("Error en los datos, por favor revise.");
    } else {
        $("#test").html(tree.toHTML(tree.head,color));

        $("#inOrderSpan").html($("#inOrderTxt").val());
        $("#preOrderSpan").html($("#preOrderTxt").val());
        $("#postOrderSpan").html($("#postOrderTxt").val());
    }
}

$(document).ready(function () {
    showInput();
    $("#preOrderSel").click(function () {
        showInput();
    });
    $("#postOrderSel").click(function () {
        showInput();
    });
});

function showInput() {
    if ($("#postOrderSel").is(':checked')) {
        $("#postOrderDiv").show(500);
        $("#postOrderTitle").show();
        $("#preOrderDiv").hide();
        $("#preOrderTitle").hide();
    } else {
        $("#preOrderDiv").show(500);
        $("#preOrderTitle").show();
        $("#postOrderDiv").hide();
        $("#postOrderTitle").hide();
    }
}
 
