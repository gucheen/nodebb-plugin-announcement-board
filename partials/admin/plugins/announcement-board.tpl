<h3>Announcement Board Management</h3>
<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<form role="form" name="announcement-board-form" class="announcement-board-settings">
				<div class="checkbox">
					<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect announcement-switcher">
						<input class="mdl-switch__input" type="checkbox" name="switcher" />
						<span class="mdl-switch__label"><strong>Show announcement</strong></span>
					</label>
				</div>
				<div class="form-group">
					<label for="announcement-content">Announcement Content</label>
					<textarea class="form-control" id="announcement-content" name="announcement-content"></textarea>
				</div>
			</form>
		</div>
	</div>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>

<script src="/plugins/nodebb-plugin-announcement-board/partials/admin/plugins/script.js"></script>