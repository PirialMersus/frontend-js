function Dropdown(options) {
    this.el = options.el || '.dropdown';
    this.speed = options.speed || 300;

    document.querySelectorAll(this.el).forEach(function (element) {

        element.childNodes[3].style.cssText = 'transition: all ' + this.speed + 'ms ease';
        // element.childNodes[1].addEventListener('click', function () {
        //     this.parentNode.classList.toggle('active');
        // });
        // console.log(element.childNodes);

        element.childNodes.forEach(function (element) {

            if (element.classList) {
                if (element.classList.contains('btn')) {
                    element.addEventListener('click', function () {
                        element.parentNode.classList.toggle('active');
                    });
                }
            }
        });
    }.bind(this));
}

Dropdown.prototype.open = function () {
    document.querySelectorAll(this.el).forEach(function (element) {

        element.classList.add('active');
    })
};

Dropdown.prototype.close = function () {
    document.querySelectorAll(this.el).forEach(function (element) {

        element.classList.remove('active');
    })
};