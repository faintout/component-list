const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

export function sanitizeFileName(name) {
	const match = DRIVE_LETTER_REGEX.exec(name);
	const driveLetter = match ? match[0] : '';
	//修改为空
	return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '');
}