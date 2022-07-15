<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UmbracoContentPickerProxy.ascx.cs" Inherits="Ucommerce.Web.UI.Controls.UmbracoContentPickerProxy" %>
<script language="javascript" type="text/javascript">

var controlid;
function contentpicker_chooseId(targetelementid) 
{
    controlid = targetelementid     
    /umbraco/dialogs/treepicker.aspx?rnd=8f50c1be2f694f2b8b44b7fc83e1ba47&id=-1&treeType=media&contextMenu=true&isDialog=false&app=media
    UmbracoClientMgr.showPopupWin(    
    showPopWin('/umbraco/dialogs/treepicker.aspx?rnd=30a12b45-ecb8-4796-a9b5-72c78fefee97&id=-1&treeType=content&contextMenu=true&isDialog=false&app=content&useSubModal=true', 350, 300, contentpicker_saveId)    
}

function contentpicker_saveId(treePicker) 
{
    setTimeout('contentpicker_saveIdDo(' + treePicker + ')', 200);
}

function contentpicker_saveIdDo(treePicker) 
{
    if (treePicker != undefined) 
    {
        document.getElementById(controlid).value = treePicker;        
        if (treePicker > 0) 
        {
            umbraco.presentation.webservices.legacyAjaxCalls.GetNodeName(treePicker, contentpicker_updateContentTitle);
        }				
    }
}	
{
    document.getElementById(controlid + "_title").innerHTML = "<strong>" + retVal + "</strong> &nbsp; <a href=\"javascript:contentpicker_clear('" + controlid + "');\" style=\"color: red\">Delete</a> &nbsp; ";
}

function contentpicker_clear(control) 
{
    document.getElementById(control + "_title").innerHTML = "";
    document.getElementById(control).value = "";
}    
</script>