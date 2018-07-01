var Util = (function () {
    function Util() {}

    var _customEventInfoList = [],
        _deleteIndexList = [],
        _isTrigger = false;

    /**********************************************************************
     *
     * Public function (with context)
     **********************************************************************/

    /**
     *
     * @param {String} nodeName
     * @param {Object} attrObj
     * @param {Object} propObj
     * @returns {Element}
     */
    Util.prototype.createDomElement = function (nodeName, attrObj, propObj) {
        if (!nodeName) {
            return null;
        }

        var el, key, styleStr;

        el = document.createElement(nodeName);

        for (key in attrObj) {
            if (key && attrObj[key] != null) {
                el[key] = attrObj[key];
            }
        }

        styleStr = "";

        for (key in propObj) {
            if (key && propObj[key] != null) {
                styleStr += key + ":" + propObj[key] + ";";
            }
        }

        if (styleStr) {
            el.setAttribute("style", styleStr);
        }

        return el;
    };

    /**
     *
     * @param {Element} parent
     * @param {Element} child
     * @returns {Element}
     */
    Util.prototype.appendChildToParent = function (parent, child) {
        if (!parent) {
            return null;
        }

        if (!child) {
            return parent;
        }

        var i, len;

        if (child.length) {
            len = child.length;

            for (i = 0; i < len; ++i) {
                if (child[i]) {
                    parent.appendChild(child[i]);
                }
            }
        } else {
            parent.appendChild(child);
        }

        return parent;
    };

    /**
     *
     * @param {Element} el
     * @param {String} prop
     * @param {*} value
     */
    Util.prototype.setStyleProp = function (el, prop, value) {
        if (!el || !prop || !value) {
            return;
        }

        el.style.setProperty(prop, value);
    };

    /**
     *
     * @param {String} name
     * @param {String} id
     * @param {*} arg
     */
    Util.prototype.trigger = function (name, id, arg) {
        var len = _customEventInfoList.length,
            i, customEventInfo, newCusomEventInfoList;

        for (i = 0; i < len; ++i) {
            customEventInfo = _customEventInfoList[i];
            _isTrigger = true;

            if (name === customEventInfo.name) {
                if (!id) {
                    customEventInfo.func.call(customEventInfo.context, arg);
                } else if (id === customEventInfo.id) {
                    customEventInfo.func.call(customEventInfo.context, arg);

                    break;
                }
            }
        }

        _isTrigger = false;

        if (_deleteIndexList.length > 0) {
            newCusomEventInfoList = [];

            for (i = 0; i < len; ++i) {
                if (_deleteIndexList.indexOf(i) === -1) {
                    newCusomEventInfoList.push(_customEventInfoList[ i ]);
                }
            }

            _customEventInfoList = newCusomEventInfoList;
            _deleteIndexList = [];
        }
    };


    /**
     *
     * @param {String} name
     * @param {Object} context
     * @param {Function} cb
     * @param {String} id
     */
    Util.prototype.bindCustomEvent = function (name, context, cb, id) {
        _customEventInfoList.push({
            name: name,
            context: context,
            func: cb,
            id: id
        });
    };

    /**
     *
     * @param {String} name
     * @param {Object} context
     */
    Util.prototype.unbindCustomEvent = function (name, context) {
        var len = _customEventInfoList.length,
            i, customEventInfo;

        for (i = 0; i < len; ++i) {
            customEventInfo = _customEventInfoList[i];

            if (name === customEventInfo.name && context === customEventInfo.context) {
                if (!_isTrigger) {
                    _customEventInfoList.splice(i, 1);
                } else {
                    _deleteIndexList.push(i);
                }

                break;
            }
        }
    };

    /**
     *
     * @param {Element} target
     * @param {String} className
     */
    Util.prototype.hasClass = function (target, className) {
        return $(target).hasClass(className);
    };

    return new Util();
})();

