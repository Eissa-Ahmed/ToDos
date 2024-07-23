import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { PictureService } from '../Services/picture.service';
import { IResponse } from '../../../../interfaces/iresponse';
import { IMedia } from '../../../../interfaces/imedia';
@Component({
  selector: 'app-add-pic',
  templateUrl: './add-pic.component.html',
  styleUrl: './add-pic.component.scss'
})
export class AddPicComponent {
  option = {
    path: 'assets/Images/add.json'
  }

  constructor(private pictureService: PictureService) {

  }

  showDialog() {
    swal.fire({
      title: 'Add Picture',
      icon: 'info',
      html:
        `
        <form>
          <div class="form-group">
            <input type="file" class="form-control" id="exampleFormControlFile1" multiple />
          </div>
        </form>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Add',
      confirmButtonColor: '#ff7f3e',
      preConfirm: () => {
        const fileInput = document.getElementById('exampleFormControlFile1') as HTMLInputElement;
        //const name = (swal.getPopup()?.querySelector('#swal-input1') as HTMLInputElement).value;
        if (!fileInput.files || fileInput.files.length === 0) {
          swal.showValidationMessage('Please select a file to upload');
        }
        return fileInput;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const fileInput = result.value;
        console.log(fileInput.files);

        this.pictureService.addPicture(fileInput.files as File[]).subscribe({
          next: (res: IResponse<IMedia>) => {
            if (res) {
              console.log("=======");

              console.log(res);

            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    });

  }
}
