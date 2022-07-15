window.setTimeout(function () {
	jQuery(".sections li a").click(function () {
		setuCommerceTitle();
	});
}, 500);

var setuCommerceTitle = function () {
	window.setTimeout(function () {
		var treeScope = angular.element('#tree .root').scope();
		if (treeScope.section) {
			if (treeScope.section == "uCommerce") {
				if (treeScope.tree){
					treeScope.tree.name = "Ucommerce";
					treeScope.$apply();
				}
			}
		}
	}, 500);
}

window.setTimeout(function () {
	var treeScope = angular.element('#tree .root').scope();
	if (treeScope) {
		treeScope.$watch(
	        setuCommerceTitle()
   		);
	}
}, 500);