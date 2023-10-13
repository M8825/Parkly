const {
          Upload
      } = require("@aws-sdk/lib-storage"),
      {
          S3
      } = require("@aws-sdk/client-s3");
const multer = require("multer");
const s3 = new S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "parklyy";

const singleFilePathUpload = async ({ filePath, pub }) => {
	const path = require("path");
	const fs = require("fs");
	const { ext } = path.parse(filePath, pub);

	const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

	if (!allowedExtensions.includes(ext.toLowerCase())) {
		throw new Error("Invalid file extension");
	}

	const Key = new Date().getTime().toString() + ext;

	const buffer = await fs.promises.readFile(filePath);

	const uploadParams = {
		Bucket: NAME_OF_BUCKET,
		Key: pub ? `spots/${Key}` : Key,
		Body: buffer,
	};

	const result = await new Upload({
        client: s3,
        params: uploadParams
    }).done();

	return pub ? result.Location : result.Key;
};

const deleteFile = async (key) => {
	const deleteParams = {
		Bucket: NAME_OF_BUCKET,
		Key: key,
	};

	await s3.deleteObject(deleteParams);
};

// const client = new S3Client({});

const deleteFiles = async (keys) => {
	// const command = new s3.DeleteObjectsCommand({
	//   Bucket: NAME_OF_BUCKET,
	//   Delete: {
	//     Objects: [keys],
	//   },
	// });

	const deleteParams = {
		Bucket: NAME_OF_BUCKET,
		Delete: {
			Objects: [keys],
		},
	};

	try {
		const status = await s3.deleteObjects(deleteParams);
	} catch (err) {
		console.error(err);
	}
};

const singleFileUpload = async ({ file, pub = false }) => {
	const { originalname, buffer } = file;
	const path = require("path");

	// Set the name of the file in your S3 bucket to the date in ms plus the
	// extension name.
	const Key = new Date().getTime().toString() + path.extname(originalname);
	const uploadParams = {
		Bucket: NAME_OF_BUCKET,
		Key: pub ? `spots/${Key}` : Key,
		Body: buffer,
	};
	const result = await new Upload({
        client: s3,
        params: uploadParams
    }).done();

	// Return the link if public. If private, return the name of the file in your
	// S3 bucket as the key in your database for subsequent retrieval.
	return pub ? result.Location : result.Key;
};

const multipleFilesUpload = async ({ files, pub = false }) => {
	return await Promise.all(
		files.map((file) => {
			return singleFileUpload({ file, pub });
		})
	);
};

const retrievePrivateFile = (key) => {
	let fileUrl;
	if (key) {
		fileUrl = s3.getSignedUrl("getObject", {
			Bucket: NAME_OF_BUCKET,
			Key: key,
		});
	}
	return fileUrl || key;
};

const storage = multer.memoryStorage({
	destination: function (req, file, callback) {
		callback(null, "");
	},
});

const singleMulterUpload = (nameOfKey) =>
	multer({ storage: storage }).single(nameOfKey);

const multipleMulterUpload = (nameOfKey) => {
	const foo = multer({ storage: storage }).array(nameOfKey);

	return foo;
};

module.exports = {
	s3,
	deleteFile,
	deleteFiles,
	singleFilePathUpload,
	singleFileUpload,
	multipleFilesUpload,
	retrievePrivateFile,
	singleMulterUpload,
	multipleMulterUpload,
};
