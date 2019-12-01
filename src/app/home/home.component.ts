import { Component, OnInit } from '@angular/core';
import { dialog } from 'electron';
import { ElectronService, JimpService } from '../core/services';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public url: string = '';

	constructor(private jimpService: JimpService, private electronService: ElectronService) {
		console.log(this.jimpService);
	}

	ngOnInit(): void { }

	async selectFile() : Promise<boolean> {
		if (!this.electronService.isElectron) {
			return false;
		}

		let dialog = this.electronService.remote.dialog;
		if (!dialog) {
			return false;
		}

		let result = await dialog.showOpenDialog({
			title: 'Open jimp file',
			properties: ['openFile']
		});

		if (!result.canceled && result.filePaths.length) {
			this.url = result.filePaths[0];
		}
		console.log(result.canceled, result.filePaths, this.url);
		return true;
	}

	async processFile() {
		console.log('Process jimp started', this.url);
		let result = this.jimpService.processFile(this.url);
		console.log('Process jimp result', result);
	}

}
