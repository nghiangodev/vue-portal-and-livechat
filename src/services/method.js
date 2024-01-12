import Swal from 'sweetalert2'
import router from '@/router'
import axios from 'axios'
import * as fs from 'fs'

//note show success sweetaleart2
export const successSwal = async (routerName, text, path = false) => {
	Swal.fire({
		title: text,
		position: 'center',
		icon: 'success',
		showCancelButton: false,
		confirmButtonColor: '#4eac6d',
		confirmButtonText: 'Xác nhận',
		cancelButtonText: 'Hủy',
		closeOnConfirm: false,
		closeOnCancel: false,
	}).then(async (confirmed) => {
		if (confirmed && confirmed.isConfirmed) {
			if (path) {
				await router.push({path: routerName})
				window.location.reload()
			} else {
				await router.push({name: routerName})
			}
		}
	})
}

//note show error sweetaleart2
export const errorSwal = async (text) => {
	await Swal.fire({
		title: text,
		position: 'center',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#4eac6d',
		confirmButtonText: 'Xác nhận',
		cancelButtonText: 'Hủy',
		closeOnConfirm: false,
		closeOnCancel: false,
	})
}

//note show warning sweetaleart2
export const warningSwal = async (routerName, text, path = false, isConfirm = true) => {
	await Swal.fire({
		title: text,
		position: 'center',
		icon: 'warning',
		showCancelButton: true,
		showConfirmButton: isConfirm,
		confirmButtonColor: '#4eac6d',
		confirmButtonText: 'Xác nhận',
		cancelButtonText: 'Hủy',
		closeOnConfirm: false,
		closeOnCancel: false,
	}).then(async (confirmed) => {
		if (confirmed && confirmed.isConfirmed) {
			if (path) {
				await router.push({path: routerName})
				window.location.reload()
			} else {
				await router.push({name: routerName})
			}
		}
	})
}

//note show loading block
export const showBlockingOverlay = async () => {
	// Dynamically add blocking overlay to the body
	const blockingOverlay = document.createElement('div')
	blockingOverlay.className = 'blocking-overlay'

	// Add your progress element (e.g., progress-4, progress-5) to the overlay
	const progressElement = document.createElement('div')
	progressElement.className = 'progress-5' // Change to your desired progress style
	blockingOverlay.appendChild(progressElement)

	document.body.appendChild(blockingOverlay)
}

//note hide loading block
export const hideBlockingOverlay = async () => {
	// Dynamically remove blocking overlay from the body
	const blockingOverlay = document.querySelector('.blocking-overlay')
	if (blockingOverlay) {
		document.body.removeChild(blockingOverlay)
	}
}

//note action delete row datatable
export const actionDelete = async (e, dt, node, config) => {
	const selectedRows = Array.from(dt.rows({selected: true}).nodes())
	const checkboxValues = []
	let data = new FormData

	selectedRows.forEach(function(row) {
		const checkbox = row.querySelector('td:first-child input[type="checkbox"]')
		if (checkbox.checked && checkbox.value !== null) {
			// Store the checkbox value in the array
			data.append('ids[]', checkbox.value)
			checkboxValues.push(checkbox.value)
		}
	})

	return {
		checkboxValues, data,
	}
}

//note action redirect edit when clicked row datatable
export const actionRedirectEdit = async (dataTableElement, path) => {

	dataTableElement.addEventListener('click', (event) => {
		const targetCell = event.target.closest('td')

		if (targetCell) {
			const columnIndex = Array.from(targetCell.parentNode.children).indexOf(targetCell)

			// Check if the clicked cell is not the first column
			if (columnIndex > 0) {
				const targetRow = targetCell.closest('tr')
				const allRowData = Array.from(targetRow.children).map(td => td.textContent)

				// Process the row data or navigate to another page
				router.push({path: `${path}${allRowData[1]}`})
			}
		}
	})
}

//note handle file upload
export const handleFileUpload = async (event, images) => {

	const files = event.target.files

	for (let i = 0; i < files.length; i++) {
		const reader = new FileReader()

		reader.onload = (e) => {
			images.push({
				url: e.target.result,
				file: files[i],
				existing: false,
				remove: false,
				id: 0,
			})
		}

		reader.readAsDataURL(files[i])
	}
}

//note handle file upload only 1
export const handleFileUploadOnly = async (event, images) => {
	const files = event.target.files

	if (images.length > 0) {
		images.shift();
	}

	for (let i = 0; i < files.length; i++) {
		const reader = new FileReader()

		reader.onload = (e) => {

			images.push({
				url: e.target.result,
				file: files[i],
				existing: false,
				remove: false,
				id: 0,
			})
		}

		reader.readAsDataURL(files[i])
	}
}

//note handle remove file upload
export const handleRemoveFileUpload = async (images, index) => {
	images[index].remove = true
	// images.splice(index, 1)
}

//note encode image url to base64 image
export const encodeImageToBase64  = async (imagePath ) => {
	try {
		const response = await fetch(imagePath);
		const blob = await response.blob();
		const reader = new FileReader();

		return new Promise((resolve, reject) => {
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	} catch (error) {
		throw error;
	}
}
//note url image to file upload
export const dataURItoBlob = async (image) => {
	try {
		const response = await fetch(image.path);
		const blob = await response.blob();
		const file = new File([blob], image.disk_name, { type: image.content_type });
		return file;
	} catch (error) {
		console.error('Error fetching or creating the image file:', error);
		throw error;
	}
};
//note url image to file upload
export const openImageInNewTab = async (imageData) => {
	try {
		// Create a new HTML document with the image
		const newDocument = document.open();
		newDocument.write('<html><head><title>Image Preview</title></head><body>');
		newDocument.write('<img src="' + imageData.url + '" alt="Image">');
		newDocument.write('</body></html>');
		newDocument.close();
	} catch (error) {
		console.error('Error fetching or creating the image file:', error);
		throw error;
	}
};
