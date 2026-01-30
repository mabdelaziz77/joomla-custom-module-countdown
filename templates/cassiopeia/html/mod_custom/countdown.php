<?php

/**
 * @package     Joomla.Site
 * @subpackage  mod_custom
 *
 * @copyright   (C) 2009 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Uri\Uri;
use Joomla\Database\DatabaseInterface;

$modId = 'mod-custom' . $module->id;
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->registerAndUseStyle('countdown-banner.style', 'media/mod_custom/css/launch_banner.css');
$wa->registerAndUseScript('countdown-banner.script', 'media/mod_custom/js/launch_banner.js');
if ($params->get('backgroundimage')) {
    $wa->addInlineStyle('
#' . $modId . '{background-image: url("' . Uri::root(true) . '/' . HTMLHelper::_('cleanImageURL', $params->get('backgroundimage'))->url . '");}
', ['name' => $modId]);
}

// set the target date
$db = Factory::getContainer()->get(DatabaseInterface::class);
$query = $db->getQuery(true)
    ->select('publish_down')
    ->from('#__modules')
    ->where('id = ' . (int) $module->id);
$db->setQuery($query);
$targetDate = $db->loadResult();

/* 
    Sync the countdown timer with the module's 'Finish Publishing' date using the site's configured timezone.
*/
$timezone = Factory::getApplication()->get('offset');
$module->content = str_replace('[[target_date]]', HtmlHelper::date($targetDate, 'Y-m-d\TH:i:s', $timezone), $module->content);
?>
<div id="<?php echo $modId; ?>" class="mod-custom custom">
    <?php echo $module->content; ?>
</div>
