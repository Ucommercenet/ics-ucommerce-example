var UcommerceClientMgr = {

    BaseServiceUrl: '/ucommerceapi/',
    BaseUCommerceUrl: "/umbraco/ucommerce/",
	Shell: "Umbraco",

	openModal: function (url, name, width, height) {
		getUmbClientMgr().openModalWindow(url, name, true, width, height);
	},

	getCurrentNodeId: function () {
		return getUmbClientMgr().mainTree().getActionNode().nodeId;
	},

	contentFrame: function (url) {
		window.setTimeout(function () {
			if (typeof getUmbClientMgr().mainWindow().right != "undefined") {
				getUmbClientMgr().mainWindow().right.location.href = url;
			}
			else {
				getUmbClientMgr().mainWindow().location.href = url; //set the current windows location if the right frame doesn't exist int he current context
			}
		}, 200);

		// Not using the standard function from Umbraco
		// as it messes around with the URL if 
		// setUmbracoPath is not called on each page.
		// All uCommerce URLs include full path so
		// no handling of URLs with missing CMS
		// path is required.
		//getUmbClientMgr().contentFrame(url);
	},

	refreshTree: function (nodeId) {
        // This function refreshes the Umbraco tree for a given node, by simulating a "reload nodes" right click menu action.
	    if (nodeId == null) {
	        nodeId = getUmbClientMgr().mainWindow().jQuery('.sprTree.noSpr.clicked').parent().attr('id');
	    }

	    var node = getUmbClientMgr().mainTree().findNode(nodeId, true);

	    if (node != false) {
	        getUmbClientMgr().mainTree().onBeforeContext(node);
	        getUmbClientMgr().mainTree().reloadActionNode(true, false, null);
	    }
	},

	refreshChildrenFor: function (keyVal) {
	    for (n in keyVal) {
	        callDelayedRefreshNode(n, keyVal);
	    };
	},

    buildNodeIdFromIdAndType: function(id, nodeType) {
        switch(nodeType) {
            case 'productCategory':
                return 'Category_' + id;
            case 'productCatalog':
                return 'productCatalog_' + id;
            default:
                return null;
        }
    },

	updateCurrentNodeText: function (nodeText) {
		getUmbClientMgr().mainWindow().jQuery(".sprTree.noSpr.clicked > div").text(nodeText);
	},

	childNodeCreated: function () {
		getUmbClientMgr().mainTree().childNodeCreated();
	},

	// For instance nodeId can be Category_67
	findAndSelectNode: function (nodeId) {
		var node = getUmbClientMgr().mainTree().findNode(nodeId, true);
		if (node != null)
			getUmbClientMgr().mainTree().selectNode(node, true, true);
	},

	closeModalWindow: function (url) {
		getUmbClientMgr().closeModalWindow(url);
	},

	showSpeechBubble: function (icon, header, body) {
		getUmbClientMgr().mainWindow().UmbSpeechBubble.ShowMessage(icon, header, body);
	},

	setFocusToTreeNode: function (treeNode) {
		getUmbClientMgr().mainTree().selectNode(node, false, true);
	},

	showPopupWindow: function (url, width, height, saveFunction) {
		getUmbClientMgr().openModalWindow(this._itemPickerUrl, this._label, this._showHeader, this._width, this._height, 60, 0, ['#cancelbutton'], function (e) { _this.SaveSelection(e); });
	}
};

function sortCategoryThis() {
    UcommerceClientMgr.openModal('ucommerce/catalog/dialogs/SortCatalog.aspx?id=' + UcommerceClientMgr.getCurrentNodeId(), 'Sort', 600, 450);
};

function sortProductsThis() {
    UcommerceClientMgr.openModal('ucommerce/catalog/dialogs/SortCatalog.aspx?id=' + UcommerceClientMgr.getCurrentNodeId() + '&products=1', 'Sort', 600, 450);
};

function callDelayedRefreshNode(n, keyVal) {
    var id = keyVal[n].id;
    var nodeType = keyVal[n].nodeType;
    var nodeId = UcommerceClientMgr.buildNodeIdFromIdAndType(id, nodeType);

    parent.setTimeout(function () {
        UcommerceClientMgr.refreshTree(nodeId);
    }, n * 500);
}

function getUmbClientMgr() {
	if (UmbClientMgr) return UmbClientMgr;
	return top.UmbClientMgr;
}


