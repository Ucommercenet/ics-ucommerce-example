angular.module('umbraco.resources').factory('uCommerceContentResource', uc_content_resource);
angular.module('umbraco').factory('uCommerceContentService', uc_content_picker_service);
angular.module('umbraco').factory('uCommerceTreeNodeIconService', uc_tree_node_icon_service);

angular.module('umbraco').controller("ucPreselectedValuesListController", uc_preselectedValuesListController);
angular.module('umbraco').controller("treeController", uc_treeController);
angular.module('umbraco').controller("umbracoUcommerceContentTreeController", umbracoUcommerceContentTreeController);
angular.module('umbraco').controller("contentPickerController", contentPickerController);
angular.module('umbraco').controller("catalogSearchController", uc_catalogSearchController);
angular.module('umbraco').controller("multiPickerController", uc_multiPickerController);

function ucMultiPicker($compile) {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/app_Plugins/uCommercePicker/ucPicker.html',
		replace: false,
		controller: umbracoUcommerceContentTreeController,
		compile: function (tElement, tAttr) {
			var contents = tElement.contents().remove();
			var compiledContents;
			return function (scope, iElement, iAttr) {
				scope.loadOnCompile = iAttr["loadOnCompile"];
				scope.currentNodeElement = iElement;
				if (!scope.contentPickerType) {
					scope.contentPickerType = iAttr["contentPickerType"];
				}

				if (!scope.selectedNodeStyle) {
					scope.selectedNodeStyle = iAttr["selectedNodeStyle"];
				}

				scope.hasRightClickMenu = iAttr["hasRightClickMenu"];
				scope.hasCheckboxFor = iAttr["hasCheckboxFor"];
				scope.multiSelect = iAttr["multiSelect"];
				scope.showSelectedNodes = true;
				if (iAttr["multiSelect"] == "false") {
					scope.showSelectedNodes = false;
				}

				scope.pickertype = iAttr["pickertype"];
				scope.iconFolder = iAttr["iconFolder"];

				var preselectedVals = iAttr["preSelectedValues"];
				if (preselectedVals) {
					scope.preSelectedValues = iAttr["preSelectedValues"].split(',');

				}
				scope.formName = iAttr["formName"];

				if (!compiledContents) {
					compiledContents = $compile(contents);
				}
				compiledContents(scope, function (clone, scope) {
					iElement.append(clone);
				});
			};

		}
	};
}

angular.module('umbraco').directive('ucommerceTree', ucommerceTree);
angular.module('umbraco').directive('ucMultiPicker', ucMultiPicker);
angular.module('umbraco').directive('ucommerceContentTree', ucommerceContentTree);
angular.module('umbraco').directive('ucommerceCatalogSearch', ucommerceCatalogSearch);
angular.module('umbraco').directive('ucommercePreselectedValuesList', ucommercePreselectedValuesList);
angular.module('umbraco').directive('ucommerceMultiPicker', ucommerceMultiPicker);